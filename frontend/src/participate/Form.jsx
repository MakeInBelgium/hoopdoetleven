import React from "react";
import { FormSpy } from "react-final-form";
import Wizard from "./Wizard";
import FieldGroup from "./components/FieldGroup";
import RadioGroup from "./components/RadioGroup";
import Checkbox from "./components/Checkbox";
import Api from "./Api";

const onSubmit = async (values) => {
    try {
        const result = await Api.doSubmission(values);
        console.log(result);

    } catch(error) {
        console.error(error);
    }
};

const initialValues = {
    contactName: null,
    contactEmail: null,
    contactPhone: null,
    type: 'text',
    heroName: null,
    videoId: null,
    videoUrl: null,
    abstract: null,
    content: null,
};

export default () => (
    <Wizard
        initialValues={initialValues}
        onSubmit={onSubmit}
    >
        <Wizard.Page>
            <FieldGroup
                label="Jouw naam"
                name="contactName"
                isRequired={true}
            />
            <FieldGroup
                label="Naam van je Coronaheld"
                name="heroName"
                isRequired={true}
            />
            <RadioGroup
                label="Wil je een video of een tekst insturen?"
                name="type"
                isRequired={true}
                options={[
                    {value: "text", label: "📝 Tekst"},
                    {value: "video", label: "🎥 Video"},
                ]}
            />
        </Wizard.Page>
        <Wizard.Page
            validate={(values) => {
                const errors = {};
                return errors;
            }}
        >
            <FieldGroup
                label="Korte uitleg"
                name="abstract"
                component="textarea"
                isRequired={true}
            />
            <FormSpy subscription={{ values: true }}>
            {({ values }) => {
                if(!values.type) {
                    return null;
                }

                return values.type === 'video' ? (<FieldGroup
                label="Youtube video URL"
                name="videoUrl"
                isRequired={true}
            />) : (
                <FieldGroup
                    label="Je verhaal"
                    name="content"
                    component="textarea"
                    isRequired={true}
                />
            )
            }}
          </FormSpy>
        </Wizard.Page>
        <Wizard.Page
            validate={(values) => {
                const errors = {};
                return errors;
            }}
        >
            <h3>Bijna klaar!</h3>
            <p className="lead">Hoe mogen we je contacteren?</p>
            <FieldGroup
                label="E-mailadres"
                name="contactEmail"
                type="email"
                isRequired={true}
            />
            <FieldGroup
                label="Telefoonnummer"
                name="contactPhone"
            />
            <Checkbox
                label="Goedkeuring"
                name="gaveConsent"
                isRequired={true}
                description="Je geeft de Coronadenktank toestemming om je filmpje te hergebruiken op sociale media, platformen van partners van HoopDoetLeven en op het compilatiefilmpje dat we met de televisiezenders zullen delen."
            />
        </Wizard.Page>
    </Wizard>
);
