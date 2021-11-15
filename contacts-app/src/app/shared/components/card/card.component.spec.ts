import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { MaterialModule } from "../../../modules/material/material.module";
import { CardComponent } from "./card.component";

const CARD_HEADER_SELECTOR = ".app-card__header";
const CARD_CONTENT_SELECTOR = ".app-card__content";

describe("CardComponent", () => {
    let component: CardTestComponent;
    let fixture: ComponentFixture<CardTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CardComponent, CardTestComponent],
            imports: [MaterialModule]
        }).compileComponents();
    });

    it("should create card component with corrent data", () => {
        const expectedTitle = "Test title";
        const expectedContent = "Inner content";
        createComponent();

        const cardDebugElement = fixture.debugElement.query(By.directive(CardComponent));
        const cardComponent = cardDebugElement.componentInstance as CardComponent;
        const cardNativeElement = cardDebugElement.nativeElement as HTMLElement;

        expect(cardComponent.title).toBe(expectedTitle);

        const header = cardNativeElement.querySelector(CARD_HEADER_SELECTOR) as HTMLElement;
        const content = cardNativeElement.querySelector(CARD_CONTENT_SELECTOR) as HTMLElement;

        expect(header.innerText).toBe(expectedTitle);
        expect(content.innerText).toBe(expectedContent);
    });

    function createComponent() {
        fixture = TestBed.createComponent(CardTestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    }

});

@Component({
    selector: "app-card-test",
    template: `
        <app-card title="Test title">
            <div>Inner content</div>
        </app-card>
    `,
})
class CardTestComponent {}
