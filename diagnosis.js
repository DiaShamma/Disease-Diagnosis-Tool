import { diseases } from './diseaseList.js';

document.addEventListener('DOMContentLoaded', () => {
  initDiagnosisPage();
});

const initDiagnosisPage = () => {
  const appDiv = document.getElementById('diagnosisApp');
  appDiv.innerHTML = `
        <h1>Diagnosis</h1>
        <div>${renderSymptomCheckboxes()}</div>
        <button onclick="showResults()">Show Possible Diseases</button>
        <div id="results"></div>
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

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
        <h2>Possible Diseases:</h2>
        <ul>
            ${possibleDiseases.map(disease => `<li>${disease.name}</li>`).join('')}
        </ul>
    `;
};
