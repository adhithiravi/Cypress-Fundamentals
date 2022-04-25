import { gql } from "@apollo/client";

export const SESSIONS_ATTRIBUTES = gql`
  fragment SessionInfo on Session {
    id
    title
    startsAt
    day
    room
    level
    speakers {
      id
      name
    }
  }
`;

export const ALL_SESSIONS = gql`
  query sessions {
    sessions {
      ...SessionInfo
    }
  }
  ${SESSIONS_ATTRIBUTES}
`;
