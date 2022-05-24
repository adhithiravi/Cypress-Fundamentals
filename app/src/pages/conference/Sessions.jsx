import React, { useState } from "react";
import "./style-sessions.css";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { SESSIONS_ATTRIBUTES, ALL_SESSIONS } from "./sharedQueries";

// Define the query
const SESSIONS = gql`
  query sessions($day: String!) {
    intro: sessions(day: $day, level: "Introductory and overview") {
      ...SessionInfo
    }
    intermediate: sessions(day: $day, level: "Intermediate") {
      ...SessionInfo
    }
    advanced: sessions(day: $day, level: "Advanced") {
      ...SessionInfo
    }
  }
  ${SESSIONS_ATTRIBUTES}
`;

function AllSessionList() {
  const { loading, error, data } = useQuery(ALL_SESSIONS);

  if (loading) return <p>Loading Sessions..</p>;

  if (error) return <p>Error loading sessions!</p>;

  return data.sessions.map((session) => (
    <SessionItem
      key={session.id}
      session={{
        ...session,
      }}
    />
  ));
}

function SessionList({ day }) {
  if (day === "") day = "Wednesday";

  // execute query and store response json
  const { loading, error, data } = useQuery(SESSIONS, {
    variables: { day },
  });

  if (loading) return <p>Loading Sessions..</p>;

  if (error) return <p>Error loading sessions!</p>;

  const results = [];

  results.push(
    data.intro.map((session) => (
      <SessionItem
        key={session.id}
        session={{
          ...session,
        }}
      />
    ))
  );

  results.push(
    data.intermediate.map((session) => (
      <SessionItem
        key={session.id}
        session={{
          ...session,
        }}
      />
    ))
  );

  results.push(
    data.advanced.map((session) => (
      <SessionItem
        key={session.id}
        session={{
          ...session,
        }}
      />
    ))
  );

  return results;
}

function SessionItem({ session }) {
  const { id, title, day, room, level, startsAt, speakers } = session;
  return (
    <div key={id} className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 data-cy={"title"} className="panel-title">
            {title}
          </h3>
          <h5 data-cy={"level"}>{`Level: ${level}`}</h5>
        </div>
        <div className="panel-body">
          <h5 data-cy={"day"}>{`Day: ${day}`}</h5>
          <h5 data-cy={"room"}>{`Room Number: ${room}`}</h5>
          <h5 data-cy={"time"}>{`Starts at: ${startsAt}`}</h5>
        </div>
        <div className="panel-footer">
          {speakers.map(({ id, name }) => (
            <span key={id} style={{ padding: 2 }}>
              <Link
                className="btn btn-default btn-lg"
                to={`/conference/speaker/${id}`}
              >
                View {name}'s Profile
              </Link>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Sessions() {
  const [day, setDay] = useState("");
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="row" style={{ padding: 10 }}>
            <Link
              className="btn btn-lg center-block"
              to={`/conference/sessions/new`}
            >
              Submit a Session!
            </Link>
          </div>
          <div className="row">
            <button
              type="button"
              onClick={() => setDay("All")}
              className="btn-oval"
              data-cy="AllSessions"
            >
              All Sessions
            </button>
            <button
              type="button"
              onClick={() => setDay("Wednesday")}
              className="btn-oval"
              data-cy="Wednesday"
            >
              Wednesday
            </button>
            <button
              type="button"
              onClick={() => setDay("Thursday")}
              className="btn-oval"
              data-cy="Thursday"
            >
              Thursday
            </button>
            <button
              type="button"
              onClick={() => setDay("Friday")}
              className="btn-oval"
              data-cy="Friday"
            >
              Friday
            </button>
          </div>
          <SessionList day={day} />
          {day === "All" && <AllSessionList />}
        </div>
      </section>
    </>
  );
}
