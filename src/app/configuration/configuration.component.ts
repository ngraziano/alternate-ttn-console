import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  public hideApiKey = true;
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private configService: AppConfigService
  ) {
    this.formGroup = this.formBuilder.group({
      apiKey: [''],
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    this.configService.save({
      id: 0,
      ttnUserToken: this.formGroup.value.apiKey,
    });
  }
}
