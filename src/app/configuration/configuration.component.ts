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
      applicationId: [''],
    });
  }

  ngOnInit(): void {
    this.configService.get().subscribe({
      next: (v) =>
        this.formGroup.setValue({
          apiKey: v.ttnUserToken ?? null,
          applicationId: v.applicationId ?? null,
        }),
    });
  }

  public onSubmit(): void {
    this.configService.save({
      id: 0,
      ttnUserToken: this.formGroup.value.apiKey,
      applicationId: this.formGroup.value.applicationId,
    });
  }

  public onClear(): void {
    this.configService.save({
      id: 0,
      ttnUserToken: undefined,
      applicationId: undefined,
    });
    this.formGroup.setValue({
      apiKey: null,
      applicationId: null,
    });
  }
}
