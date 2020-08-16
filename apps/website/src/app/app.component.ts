import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Title, Meta } from "@angular/platform-browser";
import { GoogleOptimizeService } from "./services/google-optimize.service";

declare let gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    public router: Router,
    private title: Title,
    private meta: Meta,
    private googleOptimizeService: GoogleOptimizeService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const route: string = event.urlAfterRedirects;
        gtag("config", "UA-169905580-1", {
          page_path: route,
        });
        this.setMetaData(route);
        this.googleOptimizeService.triggerActivationEvent();
      }
    });
  }

  setMetaData(route: string): void {
    let title: string = "";
    let description: string = "";

    if (route === "/services") {
      title = "Chase Manning Services";
      description =
        "The Services of Chase Manning, Freelance Developer. Including Web, Movile and Back End Development";
    } else if (route === "/contact") {
      title = "Contact Chase Manning";
      description =
        "Contact Chase Manning, Freelance Developer for help with your Web or Mobile Development project.";
    } else if (route === "/404") {
      title = "Page Not Found";
      description =
        "Looks like you are a bit lost! It's okay you can go home now, or...";
    } else {
      title = "Freelancer Developer | Chase Manning | Websites & Mobile";
      description =
        "Hi, I'm Chase, and I have a passion for development! I love working on web and mobile development and can't wait to hear about your project.";
    }

    this.title.setTitle(title);
    this.meta.updateTag({
      name: "description",
      content: description,
    });
  }
}
