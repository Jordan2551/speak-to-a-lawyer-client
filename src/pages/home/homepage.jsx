import React from 'react';
import './homepage.scss';

import Hero from '../../components/hero/hero';
import SectionHeader from '../../components/section-header/section-header';
import ContentBoxContainer from '../../components/content-box/cb-container/cb-container';
import ContactForm from '../../components/contact-form/contact-form';

import { STEP_CONTENT } from './step-content';
import { SERVICE_CONTENT } from './service-content';
import { useState } from 'react';
import StepsContext from '../../contexts/steps/steps';
import { useRef } from 'react';
import PaymentForm from '../../components/payment-form/payment-form';

const Homepage = () => {
  const [step2, setStep2] = useState({ show: false, practiceArea: '' });
  const [step3, setStep3] = useState({ show: false });

  const paymentRef = useRef();

  const showStep = (stepNum, practiceArea) => {
    if (stepNum === 2) setStep2({ show: true, practiceArea: practiceArea });
    else {
      setStep3({ show: true });
      window.scrollTo(0, paymentRef.current.offsetTop);
    }
  };

  return (
    <section id='home'>
      <Hero />
      <section id='how-it-works'>
        <SectionHeader title='How Does it Work?' variation='section-header' />
        <StepsContext.Provider value={{ step2, step3, showStep }}>
          <ContentBoxContainer content={STEP_CONTENT} variant={'step-box'} />
        </StepsContext.Provider>
      </section>
      <section id='step1'>
        <SectionHeader
          title='Choose your Service'
          subtitle='Step 1 - Select area of law and tell us a bit about how we can help.'
          variation='section-header'
        />
        <StepsContext.Provider value={{ step2, step3, showStep }}>
          <ContentBoxContainer
            content={SERVICE_CONTENT}
            variant={'service-box'}
          />
        </StepsContext.Provider>
      </section>
      {step2.show ? (
        <section id='step2' className='margin-lg'>
          <SectionHeader
            title="Let's set up your Call!"
            subtitle='Step 2 - Who are you and how can we help?'
            variation='section-header'
          />
          <ContactForm showStep={showStep} practiceArea={step2.practiceArea} />
        </section>
      ) : (
        ''
      )}
      {step3.show ? (
        <section id='step3' className='margin-lg'>
          <SectionHeader
            title='Let’s get your Payment Finalized'
            subtitle='Step 3 - Speak with a lawyer who specializes in the area of law you need help with.'
            variation='section-header'
          />
          <div ref={paymentRef}>
            <PaymentForm price={35} />
          </div>
        </section>
      ) : (
        ''
      )}
    </section>
  );
};

export default Homepage;
