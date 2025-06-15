import { useEffect } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../store/users";
import UserCard from "../components/UserCard";
import "../styles.css";

const UserList = () => {
  const { users, getUsers, isLoading, hasErrors } = useUserStore();

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (hasErrors) return <div className="error">Something went wrong</div>;

  return (
    <div className="page-container">
      <div className="user-list-header">
        <Link to="/" className="back-button">
           Back to Home
        </Link>
        <h1 className="page-title">User List</h1>
      </div>

      <div className="user-list-container">
        {users.map((user) => (
          <UserCard key={user?.id} {...user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;