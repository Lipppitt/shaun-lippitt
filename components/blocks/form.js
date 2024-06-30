import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";
import {useReCaptcha} from "next-recaptcha-v3";

export default function CustomForm({
                                       fields,
                                   }) {

    // Import 'executeRecaptcha' using 'useReCaptcha' hook
    const { executeRecaptcha } = useReCaptcha();

    return (
        <Formik
            initialValues={Object.fromEntries(fields.map(field => [field.name, '']))}
            validate={values => {
                const errors = {};
                fields.forEach(field => {
                    if (field.required && !values[field.name]) {
                        errors[field.name] = 'Required';
                    } else if (field.type === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[field.name])) {
                        errors[field.name] = 'Invalid email address';
                    }
                });
                return errors;
            }}
            onSubmit={async (values, {setSubmitting, setStatus, resetForm}) => {
                try {
                    const token = await executeRecaptcha("form_submit");

                    const response = await axios.post('/api/send', {
                        form: values,
                        token: token
                    });

                    if (response.data?.id) {
                        setStatus({
                            type: 'success',
                            message: 'Your submission has been sent.'
                        });
                        resetForm();
                    }
                } catch (error) {
                    setStatus(error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({isSubmitting, errors, status}) => (
                <Form>
                    {fields.map((field, index) => (
                        <p key={index}>
                            <label htmlFor={field.name}
                                   className={"form-label d-block"}><span>{field.label}</span></label>
                            {field.__typename === 'PagesContentSectionColumnColumn_contentFormFieldsTextarea' ? (
                                <Field
                                    as="textarea"
                                    name={field.name}
                                    placeholder={field.description}
                                    rows={4}
                                    className={errors[field.name] ? 'has-error' : ''}
                                />
                            ) : (
                                <Field
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.description}
                                    className={errors[field.name] ? 'has-error' : ''}
                                />
                            )}
                            <ErrorMessage name={field.name} component="span" className={"error"}/>
                        </p>
                    ))}
                    <button type="submit" disabled={isSubmitting} className={"btn"}>
                        Submit
                    </button>
                    {status &&
                        <div className={`form-${status.type}`}>{status.message}</div>
                    }
                </Form>
            )}
        </Formik>
    );
}
