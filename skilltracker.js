document.getElementById('add-skill-btn').addEventListener('click', function(event) {
    const skillInput = document.getElementById('skill-name');
    const skillName = skillInput.value.trim();

    if (skillName) {
        addSkill(skillName);
        skillInput.value = '';  // Clear input field after adding
    }
});

document.getElementById('skill-name').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('add-skill-btn').click();  // Trigger button click on 'Enter'
    }
});

function addSkill(skill) {
    const skillList = document.getElementById('skill-list');

    // Create skill item container
    const skillItem = document.createElement('li');
    skillItem.classList.add('skill-item');

    // Skill text
    const skillText = document.createElement('span');
    skillText.textContent = skill;

    // Mark as complete button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.onclick = function() {
        skillItem.classList.toggle('completed');
        completeButton.textContent = skillItem.classList.contains('completed') ? 'Undo' : 'Complete';
    };

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        skillItem.remove();
    };

    // Append elements to skill item
    skillItem.appendChild(skillText);
    skillItem.appendChild(completeButton);
    skillItem.appendChild(deleteButton);

    // Append skill item to skill list
    skillList.appendChild(skillItem);
}
