import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppConfigService } from '../app-config.service';

const defaultUrl = 'https://eu1.cloud.thethings.network';

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
      serverUrl: [''],
      apiKey: [''],
      applicationId: [''],
    });
  }

  ngOnInit(): void {
    this.configService.get().subscribe({
      next: (v) =>
        this.formGroup.setValue({
          serverUrl: v.serverUrl ?? null,
          apiKey: v.ttnUserToken ?? null,
          applicationId: v.applicationId ?? null,
        }),
    });
  }

  public onSubmit(): void {
    this.configService.save({
      id: 0,
      serverUrl: this.formGroup.value.serverUrl,
      ttnUserToken: this.formGroup.value.apiKey,
      applicationId: this.formGroup.value.applicationId,
    });
  }

  public onClear(): void {
    this.configService.save({
      id: 0,
      serverUrl: defaultUrl,
      ttnUserToken: undefined,
      applicationId: undefined,
    });
    this.formGroup.setValue({
      serverUrl: defaultUrl,
      apiKey: null,
      applicationId: null,
    });
  }
}
