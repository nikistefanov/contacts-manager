import { Component, Input } from '@angular/core';
import { LoaderType } from '../../models/loader';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent {
    @Input() type: LoaderType = "default"
}
