import { diseases } from './diseaseList.js';

export const initWelcomePage = () => {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = `
        <h1>Welcome to the Disease Diagnosis Tool</h1>
        <button id="startButton">Start Diagnosis</button>
        <div id="diagnosisSection" style="display:none;"></div>
    `;

  document.getElementById("startButton").addEventListener("click", startDiagnosis);
};

const startDiagnosis = () => {
  const diagnosisSection = document.getElementById('diagnosisSection');
  diagnosisSection.style.display = 'block';
  diagnosisSection.innerHTML = `
        <h2>Select Your Symptoms:</h2>
        ${renderSymptomCheckboxes()}
        <button onclick="showResults()">Show Possible Diseases</button>
    `;

  window.showResults = showResults;
};

const renderSymptomCheckboxes = () => {
  let allSymptoms = new Set();
  diseases.forEach(disease => {
    disease.symptoms.forEach(symptom => allSymptoms.add(symptom));
  });

  return Array.from(allSymptoms).map(symptom =>
    `<div><input type="checkbox" id="${symptom}" name="symptoms" value="${symptom}">
        <label for="${symptom}">${symptom}</label></div>`
  ).join('');
};

const showResults = () => {
  const selectedSymptoms = new Set();
  document.querySelectorAll('input[name="symptoms"]:checked').forEach(checkbox => {
    selectedSymptoms.add(checkbox.value);
  });

  const possibleDiseases = diseases.filter(disease =>
    disease.symptoms.some(symptom => selectedSymptoms.has(symptom))
  );

  const diagnosisSection = document.getElementById('diagnosisSection');
  diagnosisSection.innerHTML += `
        <h2>Possible Diseases:</h2>
        <ul>
            ${possibleDiseases.map(disease => `<li>${disease.name}</li>`).join('')}
        </ul>
    `;
};
