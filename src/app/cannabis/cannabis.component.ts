import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BrokerService } from '../broker.service';
import * as $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-cannabis',
  templateUrl: './cannabis.component.html',
  styleUrls: ['./cannabis.component.css']
})
export class CannabisComponent implements OnInit {

  title = 'cannabisMillionaire';

  isLoading = false;
  succesLoad = false;
  bgLoad = false;
  selfInfo: any;
  broker: any = {
    name: null,
    logo: null,
    message: null,
    refer: null,
    id: null,
    affiliateId: null,
    campaignKeyword: null,
    comment: null
  };
  link: string;
  modal: any = {
    isLoading: false,
    show: false,
    success: false
  };
  countryCode: string;
  errors: string[];
  formData = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: [''],
    password: [''],
    code: [''],
    phone: [''],
  });

  constructor(private route: ActivatedRoute,
     private http: HttpClient,
     private fb: FormBuilder,
     private cannabisService: BrokerService) {
    this.route.queryParams.subscribe(qs => {

      // this.broker.name = qs.name;
      // this.broker.logoId = qs.logo;
      // this.broker.id = qs.id;
      // this.broker.refer = qs.refer;
      // this.broker.campaignKeyword = qs.campaignkeyword;
      // this.broker.comment = qs.comment;
      this.broker.affiliateId = qs.aid;
      // this.broker.clickId = qs.clickid;
      // this.broker.pixelID = qs.pixel;
      // this.broker.iframeURL = '';
      if (this.broker.logoId) {
        this.http
          .get(`assets/logos.json`, { responseType: 'text' })
          .subscribe((data: string) => {
            // tslint:disable-next-line:prefer-const
            let logos = JSON.parse(data);
            const match = _.find(logos.logos, { id: +this.broker.logoId }) as any;
            this.broker.logo = match.url;
          });
      }
      this.http.get(`https://ipapi.co/json`).subscribe(data => {
        this.selfInfo = data;
        this.countryCode = this.selfInfo.country_calling_code;
        console.log(this.selfInfo);

      },
        error => {
          console.error(error);
        }
      );
    });
  }

  ngOnInit() {
    const urlAuto = 'https://faa-crm.me/api/leads/autologin/';
    
  }
  autologin() {
    window.location.href = this.link;
  }
  onSubmit() {
    this.isLoading = true;
    this.bgLoad = true;
    console.log(this.isLoading);
    const data = {
      affiliateId: this.broker.affiliateId,
      firstName: this.formData.value.firstName,
      lastName: this.formData.value.lastName,
      email: this.formData.value.email.replace(/\s/g, ''),
      phone: `${
        this.selfInfo.country_calling_code
      }${this.formData.value.phone.replace(/\s/g, '')}`,
      // country: { code: this.selfInfo.country },
      // currency: this.selfInfo.currency,
      // customRefer: this.broker.refer,
      // brokerId: +this.broker.id,
      // campaignKeyword: this.broker.campaignKeyword,
      // clickId: this.broker.clickId,
      // comment: this.broker.comment,
      externalApiPassword: this.formData.value.password
    };
    console.log(data);
    this.cannabisService.registerLead(data).subscribe(
      (x: any) => {
        console.log(x);
     this.isLoading = false;
        this.succesLoad = true;
        this.cannabisService.autologin(x.id).subscribe((res: any) => {
          this.link = res.link;
          ($('#myModal') as any).modal('show');
        });
      },
      e => {
        this.broker.message = 'No brokers avalilable.';
            this.isLoading = false;
            this.bgLoad = false;
            this.succesLoad = false;
            this.errors = e.error.errors;
        if (e.error && e.error.errors && e.error.errors.length > 0) {
          this.broker.message = e.error.errors.join('<br/>');
        }
        console.error(e);
      }
    );
  }

}
