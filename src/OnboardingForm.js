import { useState } from "react";
import axios from "axios";

const OnboardingForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        emailGroups: "",
        userManager: "",
        startDate: "",
        department: [],
        hardwareRequirements: [],
        applicationAccess: [],
        slackChannels: [],
        OktaGroups: [],
        zoomLicense: "",
        addtoM365: "",
        addSalesforce: "",
        addto1password: "",
        sharepointSites: [],
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked
                    ? [...prevData[name], value]
                    : prevData[name].filter((item) => item !== value),
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting data:", formData);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/onboard",
                formData
            );
            setMessage("Form submitted successfully!");
            console.log("Server Response:", response.data);
        } catch (error) {
            setMessage("Error submitting form. Please try again.");
            console.error("Submission Error:", error);
        }
    };

    return (
        <div className="container">
            <h1>Armhr Onboarding</h1>
            <form onSubmit={handleSubmit}>

                <fieldset>
                    <label>First Name</label>
                    <input type="text" name="firstName" onChange={handleChange} required />
                </fieldset>

                <fieldset>
                    <label>Last Name</label>
                    <input type="text" name="lastName" onChange={handleChange} required />
                </fieldset>

                <fieldset>
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </fieldset>

                <fieldset>
                    <label>Email Groups (one per line)</label>
                    <textarea name="emailGroups" rows="3" onChange={handleChange} placeholder="Group1@example.com&#10;Group2@example.com"></textarea>
                </fieldset>

                <fieldset>
                    <label>Manager (email)</label>
                    <input type="email" name="userManager" onChange={handleChange} />
                </fieldset>

                <fieldset>
                    <label>Start Date</label>
                    <input type="date" name="startDate" onChange={handleChange} required />
                </fieldset>

                <fieldset>
                    <legend>Department</legend>
                    <label><input type="checkbox" name="department" value="Option 1" onChange={handleChange} /> Option 1</label>
                    <label><input type="checkbox" name="department" value="Option 2" onChange={handleChange} /> Option 2</label>
                    <label><input type="checkbox" name="department" value="Other" onChange={handleChange} /> Other</label>
                </fieldset>

                <fieldset>
                    <legend>Hardware Requirements</legend>
                    <label><input type="checkbox" name="hardwareRequirements" value="Option 1" onChange={handleChange} /> Option 1</label>
                    <label><input type="checkbox" name="hardwareRequirements" value="Option 2" onChange={handleChange} /> Option 2</label>
                </fieldset>

                <fieldset>
                    <legend>Application Access</legend>
                    <label><input type="checkbox" name="applicationAccess" value="Option 1" onChange={handleChange} /> Option 1</label>
                    <label><input type="checkbox" name="applicationAccess" value="Option 2" onChange={handleChange} /> Option 2</label>
                </fieldset>

                <fieldset>
                    <legend>Slack Channels</legend>
                    <label><input type="checkbox" name="slackChannels" value="general" onChange={handleChange} /> Option 1</label>
                    <label><input type="checkbox" name="slackChannels" value="random" onChange={handleChange} /> Option 2</label>
                </fieldset>

                <fieldset>
                    <legend>Okta Groups</legend>
                    <label><input type="checkbox" name="OktaGroups" value="Option1" onChange={handleChange} /> Option 1</label>
                    <label><input type="checkbox" name="OktaGroups" value="Option2" onChange={handleChange} /> Option 2</label>
                </fieldset>

                <fieldset>
                    <legend>Zoom License</legend>
                    <label><input type="radio" name="zoomLicense" value="Option1" onChange={handleChange} /> Option 1</label>
                    <label><input type="radio" name="zoomLicense" value="Option2" onChange={handleChange} /> Option 2</label>
                </fieldset>

                <fieldset>
                    <legend>Microsoft 365 Access</legend>
                    <label><input type="radio" name="addtoM365" value="Option1" onChange={handleChange} /> Option 1</label>
                    <label><input type="radio" name="addtoM365" value="Option2" onChange={handleChange} /> Option 2</label>
                </fieldset>

                <fieldset>
                    <label>Add to Salesforce</label>
                    <input type="email" name="addSalesforce" placeholder="Enter email" onChange={handleChange} />
                </fieldset>

                <fieldset>
                    <label>Add to 1Password</label>
                    <input type="email" name="addto1password" placeholder="Enter email" onChange={handleChange} />
                </fieldset>

                <button type="submit">Submit</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default OnboardingForm;
