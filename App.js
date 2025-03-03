import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    experience: '',
    zipCode: '',
    education: '',
    selectedSkills: []
  });

  const [isSearchMode, setIsSearchMode] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [searchRegistration, setSearchRegistration] = useState('');
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const experienceOptions = ['0-2 years', '2-5 years', '5-8 years', '8+ years'];
  const educationOptions = ['MCA', 'Bachelor', 'Master'];
  // Remove "Other" from available skills since it will be handled separately.
  const availableSkills = ['JavaScript', 'Python', 'Java', 'C++', 'React', 'Node.js'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    if (skill === 'Other') {
      setIsOtherSelected(true);
    } else if (!formData.selectedSkills.includes(skill)) {
      setFormData(prevState => ({
        ...prevState,
        selectedSkills: [...prevState.selectedSkills, skill]
      }));
    }
  };

  const handleCustomSkillChange = (e) => {
    setCustomSkill(e.target.value);
  };

  const handleAddCustomSkill = () => {
    if (customSkill && !formData.selectedSkills.includes(customSkill)) {
      setFormData(prevState => ({
        ...prevState,
        selectedSkills: [...prevState.selectedSkills, customSkill]
      }));
      setCustomSkill('');
      setIsOtherSelected(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prevState => ({
      ...prevState,
      selectedSkills: prevState.selectedSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const mockResults = [{
      registrationNumber: "EMP123456",
      firstName: "Lionel",
      lastName: "Messi",
      email: "messi@barcelona.com",
      phone: "1234567890"
    }];
    setSearchResults(mockResults);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.push("Phone number must be exactly 10 digits");
    }

    const zipRegex = /^\d{6}$/;
    if (!formData.zipCode) {
      errors.push("Zip code is required");
    } else if (!zipRegex.test(formData.zipCode)) {
      errors.push("Zip code must be exactly 6 digits");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const registrationNumber = `EMP${Date.now()}`;
    alert(`Registration successful!\nYour registration number is: ${registrationNumber}`);

    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      experience: '',
      zipCode: '',
      education: '',
      selectedSkills: []
    });
    setCustomSkill('');
    setIsOtherSelected(false);
  };

  return (
    <div className="container">
      <h1 className="title">Employee Management System</h1>
      <div className="toggle-container">
        <button className={`toggle-button ${!isSearchMode ? 'active' : ''}`} onClick={() => setIsSearchMode(false)}>Registration</button>
        <button className={`toggle-button ${isSearchMode ? 'active' : ''}`} onClick={() => setIsSearchMode(true)}>Search</button>
      </div>

      {!isSearchMode ? (
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number (10 digits)" value={formData.phone} onChange={handleChange} required pattern="\d{10}" />
          <input type="text" name="zipCode" placeholder="Zip Code (6 digits)" value={formData.zipCode} onChange={handleChange} required pattern="\d{6}" />
          <div className="education-options">
            <div className="education-label">Education Level:</div>
            {educationOptions.map((option) => (
              <label key={option}>
                <input type="radio" name="education" value={option} checked={formData.education === option} onChange={handleChange} required />
                {option}
              </label>
            ))}
          </div>
          <div className="experience-options">
            <label className="experience-label">Experience:</label>
            <select name="experience" value={formData.experience} onChange={handleChange} required>
              <option value="">Select experience</option>
              {experienceOptions.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Skills:(required)</label>
            <select onChange={handleSkillChange} className="skill-select" multiple>
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
           
            {isOtherSelected && (
              <div className="custom-skill-input">
                <input
                  type="text"
                  value={customSkill}
                  onChange={handleCustomSkillChange}
                  placeholder="Add custom skill"
                  className="input"
                />
                <button type="button" onClick={handleAddCustomSkill} className="button">
                  Add Custom Skill
                </button>
              </div>
            )}
           
            <div className="selected-skills">
              {formData.selectedSkills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="remove-skill">
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      ) : (
        <form onSubmit={handleSearch} className="form">
          <input type="text" placeholder="Search by Registration Number" value={searchRegistration} onChange={(e) => setSearchRegistration(e.target.value)} />
          <input type="text" placeholder="Search by First Name" value={searchFirstName} onChange={(e) => setSearchFirstName(e.target.value)} />
          <input type="text" placeholder="Search by Last Name" value={searchLastName} onChange={(e) => setSearchLastName(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      )}
    </div>
  );
}

export default App;
