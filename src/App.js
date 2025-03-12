import React from "react";
import OnboardingForm from "./OnboardingForm";
import "./styles.css";

function App() {
    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h1>Employee Onboarding</h1>
            <OnboardingForm />
        </div>
    );
}

export default App;
