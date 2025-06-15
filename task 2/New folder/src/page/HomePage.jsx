import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/UserCard";
import useUserStore from "../store/users";
import "../styles.css";

const MAX_SEARCH_PARAMS = 3;

const HomePage = () => {
  const [searchParams, setSearchParams] = useState([{ field: "name", value: "" }]);
  const { getUser, user, hasErrors, isLoading, clearUser } = useUserStore();

  const handleSearch = async (index, e) => {
    const value = e.target.value;
    const updatedParams = [...searchParams];
    updatedParams[index].value = value;
    setSearchParams(updatedParams);

    if (value.trim().length >= 3) {
      await getUser({ [updatedParams[index].field]: value });
    } else {
      clearUser();
    }
  };

  const handleFieldChange = (index, e) => {
    const updatedParams = [...searchParams];
    updatedParams[index].field = e.target.value;
    setSearchParams(updatedParams);
  };

  const addSearchField = () => {
    if (searchParams.length < MAX_SEARCH_PARAMS) {
      setSearchParams([...searchParams, { field: "name", value: "" }]);
    }
  };

  const removeSearchField = (index) => {
    if (searchParams.length > 1) {
      const updated = searchParams.filter((_, i) => i !== index);
      setSearchParams(updated);
      clearUser();
    }
  };

  // امسح النتيجة لو كل القيم فاضية
  useEffect(() => {
    const allEmpty = searchParams.every((param) => param.value.trim() === "");
    if (allEmpty) clearUser();
  }, [searchParams, clearUser]);

  return (
    <main className="home-page-container">
      <section className="home-content-box">
        <h1 className="home-title">User Management System</h1>

        <div className="search-section">
          <h2 className="section-title">Search Users</h2>

          {searchParams.map((param, index) => (
            <div key={index} className="search-row">
              <select
                className="search-select"
                value={param.field}
                onChange={(e) => handleFieldChange(index, e)}
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>

              <input
                className="search-input"
                type="search"
                value={param.value}
                onChange={(e) => handleSearch(index, e)}
                placeholder="Type at least 3 characters..."
              />

              {searchParams.length > 1 && (
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeSearchField(index)}
                >
                  x
                </button>
              )}
            </div>
          ))}

          {searchParams.length < MAX_SEARCH_PARAMS && (
            <button
              type="button"
              className="add-button"
              onClick={addSearchField}
            >
              Add More
            </button>
          )}
        </div>

        {isLoading && <div className="loading">Loading users...</div>}

        {hasErrors && (
          <div className="error">
            {hasErrors.message || "Something went wrong!"}
          </div>
        )}

        {user && searchParams.some(param => param.value.trim().length >= 3) && (
          <div className="search-results">
            <h2 className="section-title">Search Results:</h2>
            <UserCard {...user} />
          </div>
        )}

        <div className="action-buttons" style={{ textAlign: "center", marginTop: 30 }}>
          <Link to="/users" className="view-all-button">
            View All Users
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
