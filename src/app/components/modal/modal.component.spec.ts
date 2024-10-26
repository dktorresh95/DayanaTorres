import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent]
    });
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expect boolean false to close modal', () => {
    component.open();
    component.close();
    expect(component.isOpen).toBeFalsy();
  });

  it('should validate isOpen when calls action', () => {
    component.action();
    expect(component.isOpen).toBeFalsy();
  });
});
