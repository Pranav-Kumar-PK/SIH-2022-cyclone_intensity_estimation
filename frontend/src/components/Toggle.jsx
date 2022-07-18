import React from "react";
import { NavLink } from "react-router-dom";

const Toggle = () => {
  return (
    <div>
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
