import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

// • Create a React application with Typescript. ✅
// • Design and implement a form questionnaire with the following fields:
// • Name✅
// • Age✅
// • Gender✅
// • Health Condition(Dropdown: Healthy, Minor illness, Chronic illness)✅
// • Have you experienced any symptoms in the last 14 days ? (Yes / No)✅
// • If yes, list the symptoms experienced(if applicable)✅
// • Implement branching logic based on user responses:✅
// • If the user selects "Chronic illness" in the Health Condition field, additional
// questions related to their condition should be displayed.✅
// • If the user selects "Yes" to experiencing symptoms, additional questions
// related to their symptoms should be displayed.✅
// • Ensure validation for required fields and appropriate error handling.✅

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other"
}

enum healthConditionEnum {
  healthy = "healthy",
  minorIllness = "minorIllness",
  chronicIllness = "chronicIllness"
}

enum symptomsEnum {
  yes = "yes",
  no = "no"
}

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
  gender: GenderEnum;
  healthCondition: healthConditionEnum;
  symptoms: symptomsEnum;
  questionsChronicIllness?: string;
  symptomsList?: string;
}

export default function App() {
  const { register, handleSubmit, watch, control, reset, formState: { errors, isSubmitting, isSubmitted, isValid } } = useForm<IFormInput>();
  const symptomsValue = watch("symptoms");

  // const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  const onError = (errors: FieldErrors<IFormInput>) => {
    console.log(errors);
    alert("Form submission failed");
  }

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("/api/submit", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        reset();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const validateSelectOptions = (value: string) => {
    if (value === "") {
      return "This field is required";
    }
  }

  return (
    <div className="w-screen h-screen">
      <h1 className="text-5xl text-center p-10">Healthcare Questionnaire</h1>
      <div className="flex flex-row justify-center">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-4">
          <label>First Name</label>
          <input {...register("firstName", {
            required: "First name is required",
            maxLength: 30
          })} />
          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
          <label>Last Name</label>
          <input {...register("lastName", {
            required: "Last name is required",
            maxLength: 30
          })} />
          {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
          <label>Gender</label>
          <select {...register("gender", {
            validate: validateSelectOptions,
          },
          )}
          >
            <option value=""></option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
          <label>Age</label>
          <input {...register("age", { min: 1, max: 150, required: "Age is required" })} />
          {errors.age && <span className="text-red-500">{errors.age.message}</span>}

          <label>Health Condition</label>
          <select {...register("healthCondition", {
            validate: validateSelectOptions,
          },)} >
            <option value=""></option>
            <option value="healthy">Healthy</option>
            <option value="minorIllness">Minor Illness</option>
            <option value="chronicIllness">Chronic Illness</option>
            {/* {healthConditionEnum.chronicIllness === "chronicIllness" && (
              <div>
                <label>List the chronic illnesses experienced(if applicable)</label>
                <input {...register("questionsChronicIllness", {
                  required: "If you selected chronic ilnesses, this field is required",
                })} />
              </div>
            )} */}
          </select>
          {errors.healthCondition && <span className="text-red-500">{errors.healthCondition.message}</span>}
          <label>Have you experienced any symptoms in the last 14 days ?</label>
          <select {...register("symptoms", { validate: validateSelectOptions })} >
            <option value=""></option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.symptoms && <span className="text-red-500">{errors.symptoms.message}</span>}
          {symptomsValue === "yes" && (
            <div>
              <label>List the symptoms experienced(if applicable)</label>
              <input {...register("symptomsList", {
                required: "If you selected yes for experiencing symptoms, this field is required",
              })} />
            </div>
          )}
          <button type="submit">Submit</button>
        </form>
        <DevTool control={control} />
      </div>
    </div >

  );
}
