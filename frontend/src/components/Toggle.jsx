import React from "react";
import { NavLink } from "react-router-dom";

const Toggle = (props) => {
  return (
    <div className="toggle">
      <div class="form-check">
        <NavLink
          className="navbar-item"
          activeClassName="is-active"
          to="/map/analysis/urbanization"
        >
          <input
            class="form-check-input"
            type="radio"
            name="Analysis"
            id="Urbanization"
            checked={props.currentPage === "urbanization" ? true : false}
          />
          <label class="form-check-label" for="Urbanization">
            Urbanization
          </label>
        </NavLink>
      </div>
      <div class="form-check">
        <NavLink
          className="navbar-item"
          activeClassName="is-active"
          to="/map/analysis/poverty"
        >
          <input
            class="form-check-input"
            type="radio"
            name="Analysis"
            id="Poverty"
            checked={props.currentPage === "poverty" ? true : false}
          />
          <label class="form-check-label" for="Poverty">
            Poverty
          </label>
        </NavLink>
      </div>
      <div class="form-check">
        <NavLink className="navbar-item" activeClassName="is-active" to="/map">
          <input
            class="form-check-input"
            type="radio"
            name="Analysis"
            id="Original"
          />
          <label class="form-check-label" for="Original">
            Original
          </label>
        </NavLink>
      </div>
    </div>
  );
};

export default Toggle;
