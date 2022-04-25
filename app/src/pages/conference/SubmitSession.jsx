import { Formik, Field, Form } from "formik";
import { gql, useMutation } from "@apollo/client";
import { SESSIONS_ATTRIBUTES, ALL_SESSIONS } from "./sharedQueries";

const CREATE_SESSION = gql`
  mutation createSession($session: SessionInput!) {
    createSession(session: $session) {
      ...SessionInfo
    }
  }
  ${SESSIONS_ATTRIBUTES}
`;

export function SessionForm() {
  const updateSessions = (cache, { data }) => {
    cache.modify({
      fields: {
        sessions(exisitingSessions = []) {
          const newSession = data.createSession;
          cache.writeQuery({
            query: ALL_SESSIONS,
            data: { newSession, ...exisitingSessions },
          });
        },
      },
    });
  };

  const [create, { called, error }] = useMutation(CREATE_SESSION, {
    update: updateSessions,
  });

  if (called) return <p>Session Submitted Successfully!</p>;

  if (error) return <p>Failed to submit session</p>;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <Formik
        initialValues={{
          title: "",
          description: "",
          day: "",
          level: "",
        }}
        onSubmit={async (values) => {
          await create({ variables: { session: values } });
        }}
      >
        {() => (
          <Form style={{ width: "100%", maxWidth: 500 }}>
            <h3 className="h3 mb-3 font-weight-normal">Submit a Session!</h3>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputTitle">Title</label>
              <Field
                id="inputTitle"
                className="form-control"
                required
                autoFocus
                name="title"
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputDescription">Description</label>
              <Field
                type="textarea"
                id="inputDescription"
                className="form-control"
                required
                name="description"
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputDay">Day</label>
              <Field
                name="day"
                id="inputDay"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputLevel">Level</label>
              <Field
                name="level"
                id="inputLevel"
                className="form-control"
                required
              />
            </div>
            <div style={{ justifyContent: "center", alignContent: "center" }}>
              <button className="btn btn-primary">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export function AddSession() {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row">
            <SessionForm />
          </div>
        </div>
      </section>
    </>
  );
}
