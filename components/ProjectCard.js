import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteProject } from '../utils/data/ProjectData';
// import { useAuth } from '../utils/context/authContext';

export default function ProjectCard({ projectObj, refreshPage }) {
  const router = useRouter();
  // const { user } = useAuth();

  // const isCurrentUserCreator = user && projectObj.user === user.uid;

  const deleteThisProject = async () => {
    if (window.confirm('Delete this project?')) {
      await deleteProject(projectObj.id);
      refreshPage(); // Trigger a refresh after deletion
    }
  };

  return (
    <>
      <div className="project-cards-container">
        <Card className="text-center project-card" style={{ width: '25rem', margin: 20 }}>
          <Card.Header><b>{projectObj.name}</b></Card.Header>
          <Card.Body>
            <Card.Text><b>Status:</b> {projectObj.status}</Card.Text>
            <Card.Text><b>Due Date:</b> {projectObj.due_date}</Card.Text>

            <Link href={`/projects/${projectObj.id}`} passHref>
              <Button variant="primary" as="a">Details</Button>
            </Link>
            &nbsp;
            <Button
              variant="warning"
              onClick={() => {
                router.push(`/projects/edit/${projectObj.id}`);
              }}
            >
              Edit
            </Button>

                &nbsp;
            <Button variant="danger" onClick={deleteThisProject}>
              Delete
            </Button>
            {/* {isCurrentUserCreator && (
              <>
                &nbsp;
                <Button
                  variant="warning"
                  onClick={() => {
                    router.push(`/projects/edit/${projectObj.id}`);
                  }}
                >
                  Edit
                </Button>

                &nbsp;
                <Button variant="danger" onClick={deleteThisProject}>
                  Delete
                </Button>
              </>
            )} */}
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

ProjectCard.propTypes = {
  projectObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    // user: PropTypes.string.isRequired,
  }).isRequired,
  refreshPage: PropTypes.func,
};

ProjectCard.defaultProps = {
  refreshPage: () => {},
};
