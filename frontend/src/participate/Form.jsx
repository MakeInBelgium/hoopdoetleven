import React, { useState, useCallback } from "react";
import { FormSpy } from "react-final-form";
import Wizard from "./Wizard";
import FieldGroup from "./components/FieldGroup";
import RadioGroup from "./components/RadioGroup";
import Checkbox from "./components/Checkbox";
import Api from "./Api";
import { translate, minMax } from "./utils";

const initialValues = window.location.hostname === 'localhost' ? {
    contactName: 'Koen Van den Wijngaert',
    contactEmail: 'koen@neok.be',
    contactPhone: '+32498207303',
    gaveConsent: false,
    type: 'text',
    heroName: 'Joke De Nul',
    abstract: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eaque porro enim magni, molestiae vero quasi ab.',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eaque porro enim magni, molestiae vero quasi ab. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eaque porro enim magni, molestiae vero quasi ab. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eaque porro enim magni, molestiae vero quasi ab.',
} : {
    type: 'text',
    gaveConsent: false,
};

const Alert = ({children, type = "danger", ...props}) => <div className={`alert alert-${type}`} {...props}>{children}</div>; 

const FormErrors = ({sent, valid, errors = []}) => {
    if(!sent || valid) return null;

    if(!valid && errors.length) {
        return <Alert type="warning">
            <p>{translate('validation.validationFailed')}</p>
            <ul>
                {errors.map((error, i) => <li key={`error-${i}`}>{error}</li>)}
            </ul>
        </Alert>
    }

    return <Alert>{translate('validation.panicMsg')}</Alert>
};

export default () => {
    const [submitState, setSubmitState] = useState({
        sent: false,
        valid: false,
        errors: [],
    });

    const onSubmit = useCallback(async (values) => {
        try {
            const result = await Api.doSubmission(values);

            if(result === true) {
                setSubmitState({
                    sent: true,
                    valid: true,
                    errors: [],
                });

                return {};
            }

            if(result.violations) {
                const errors = {};
                const messages = result.violations.map(({propertyPath, message}) => `${translate(`fields.${propertyPath}`)}: ${translate(message)}`);
        
                for(const {propertyPath, message} of result.violations) {
                    errors[propertyPath] = translate(message);
                }

                setSubmitState({
                    sent: true,
                    valid: false,
                    errors: messages,
                });
    
                return errors;
            }

            setSubmitState({
                sent: true,
                valid: false,
                errors: [],
            });    
        } catch(error) {
           setSubmitState({
                sent: true,
                valid: false,
                errors: [translate(error.message)],
            });

            return false;

        }
    }, [setSubmitState]);

    if(submitState.sent && submitState.valid) {
        return <Alert type="success">{translate('validation.validationPassed')}</Alert>;
    }

    return (
    <Wizard
        initialValues={initialValues}
        onSubmit={onSubmit}
    >
        <Wizard.Page>
            <FieldGroup
                label={translate('fields.contactName')}
                name="contactName"
                isRequired={true}
            />
            <FieldGroup
                label={translate('fields.heroName')}
                name="heroName"
                isRequired={true}
            />
            <RadioGroup
                label={translate('fields.type')}
                name="type"
                isRequired={true}
                options={[
                    {value: "text", label: translate('typeLabels.text')},
                    {value: "video", label:translate('typeLabels.video')},
                ]}
            />
        </Wizard.Page>
        <Wizard.Page>
            <FieldGroup
                label={translate('fields.abstract')}
                name="abstract"
                component="textarea"
                isRequired={true}
                validate={minMax(10, 300, 'validation.abstract.min', 'validation.abstract.max')}
            />
            <FormSpy subscription={{ values: true }}>
            {({ values }) => {
                if(!values.type) {
                    return null;
                }

                return values.type === 'video' ? (<FieldGroup
                label={translate('fields.videoUrl')}
                name="videoUrl"
                isRequired={true}
            />) : (
                <FieldGroup
                    label={translate('fields.content')}
                    name="content"
                    component="textarea"
                    rows="5"
                    isRequired={true}
                    validate={minMax(100, 2500, 'validation.content.min', 'validation.content.max')}
                />
            )
            }}
          </FormSpy>
        </Wizard.Page>
        <Wizard.Page>
            <h3>{translate('copy.lastPageTitle')}</h3>
            <p className="lead">{translate('copy.lastPageText')}</p>
            <FormErrors {...submitState} />
            <FieldGroup
                label={translate('fields.contactEmail')}
                name="contactEmail"
                type="email"
                isRequired={true}
            />
            <FieldGroup
                label={translate('fields.contactPhone')}
                name="contactPhone"
            />
            <Checkbox
                label={translate('fields.gaveConsent')}
                name="gaveConsent"
                isRequired={true}
                description={translate('fields.consentText')}
            />
        </Wizard.Page>
    </Wizard>
)};
