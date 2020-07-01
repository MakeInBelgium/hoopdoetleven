export default {
    fields: {
        contactName: "Name",
        heroName: "Name Ihres Corona-Helden",
        type: "Möchten Sie ein Video oder einen Text einreichen?",
        videoUrl: "Youtube video URL",
        abstract: "Kurze Erklärung",
        content: "Ihre Geschichte",
        contactEmail: "E-Mail-Adresse",
        contactPhone: "Telefonnummer",
        gaveConsent: "Zustimmung",
        consentText: "Sie erteilen dem Coronadenktank die Erlaubnis, Ihren Film auf sozialen Medien, Plattformen von Partnern von HoopDoetLeven und auf dem Kompilationsfilm, den wir mit den Fernsehsendern teilen werden, wiederzuverwenden.",
    },
    buttons: {
        next: "Weiter »",
        previous: "« Zurück",
        submit: "Senden",
    },
    typeLabels: {
        text: "📝 Text",
        video: "🎥 Video",
    },
    copy: {
        lastPageTitle: "Fast fertig!",
        lastPageText: "Wie können wir Sie kontaktieren?",
    },
    validation: {
        required: "Pflichtfelder",
        validationPassed: "Vielen Dank für Ihre Einreichung, sie wurde gut aufgenommen!",
        validationFailed: "Bei der Einreichung sind Fehler aufgetreten. Bitte korrigieren Sie sie und versuchen Sie es dann erneut.",
        failedVerification: "Ihre Eingabe konnte nicht verifiziert werden. Versuchen Sie es später noch einmal!",
        panicMsg: "Etwas ging bei der Einreichung schief... Versuchen Sie es später noch einmal!",
        type: "Geben Sie an, ob Sie Text oder Video einreichen möchten.",
        contactName: "Bitte geben Sie einen gültigen Namen ein.",
        contactEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        heroName: "Geben Sie den Namen Ihres Helden ein.",
        gaveConsent: "Ohne Ihre Zustimmung können wir Ihren Eintrag nicht bearbeiten.",
        abstract: {
            min: "Ihre kurze Erklärung muss mindestens 10 Zeichen lang sein.",
            max: "Ihre kurze Erklärung kann bis zu 300 Zeichen lang sein.",
        },
        content: {
            min: "Ihre Geschichte muss mindestens 100 Zeichen lang sein.",
            max: "Ihre Geschichte kann bis zu 2500 Zeichen lang sein.",
        },
    }
};
