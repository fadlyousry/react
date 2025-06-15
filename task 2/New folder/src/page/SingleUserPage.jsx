import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useUserStore from "../store/users";
import "../styles.css";

const SingleUserPage = () => {
  const { userID } = useParams();
  const { getUser, user, isLoading, hasErrors } = useUserStore();

  useEffect(() => {
    getUser({ id: userID });
  }, [userID]);

  if (isLoading) return (
    <div className="loading-skeleton">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
    </div>
  );

  if (hasErrors) return (
    <div className="error-alert">
      <h3> Error</h3>
      <p>{hasErrors.message}</p>
    </div>
  );

  return (
   <div className="page-container">
  <div className="user-card">
    <Link to="/users" className="view-details-btn">← Back to Users</Link>
    <h3>{user?.name || "N/A"}</h3>
    <p><strong>Email:</strong> {user?.email || "N/A"}</p>
    <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
    <p><strong>Website:</strong> 
      {user?.website ? (
        <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
          {user.website}
        </a>
      ) : "N/A"}
    </p>

    <div className="info-section">
      <h4>Address</h4>
      <p><strong>City:</strong> {user?.address?.city || "N/A"}</p>
      <p><strong>Street:</strong> {user?.address?.street || "N/A"}</p>
      <p><strong>Suite:</strong> {user?.address?.suite || "N/A"}</p>
      <p><strong>Zipcode:</strong> {user?.address?.zipcode || "N/A"}</p>
    </div>
    <br />

    <div className="info-section">
      <h4>Company</h4>
      <p><strong>Name:</strong> {user?.company?.name || "N/A"}</p>
      <p><strong>Catchphrase:</strong> {user?.company?.catchPhrase || "N/A"}</p>
      <p><strong>Business:</strong> {user?.company?.bs || "N/A"}</p>
    </div>

    <Link to="/" className="view-details-btn">
       Back to Home
    </Link>
  </div>
</div>

  );
};

export default SingleUserPage;
