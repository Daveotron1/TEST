document.addEventListener('DOMContentLoaded', function () {
    
    const toolReasonMapping = {
        // Your existing tool-reason mapping
        "1000": ["RepairSolutions2-Bluetooth-Pairing-Troubleshooting-Guide-For-Android", "RepairSolutions2-How-To-Report-An-Issue", 
        "How-to-run-a-Report-for-your-Check-Engine-Light", "How-to-reset-your-RepairSolutions2-Password", "Troubleshooting-guide-No-Green-LED-Light-on-the-Dongle",
        "OBDII-ELM327-APPs","RepairSolutions2-App-Subscription-Details", "Understanding-OBDII-DTC-Trouble-Codes", "Searching-for-a-Specific-Error-Code",
        "Accessing-Mode-6-Feature"],
             
        "5010": ["Tool-not-powering-on"],
             
        "5110": ["Erasing-Diagnostic-Trouble-Codes-(DTCs)-with-Innova-5110", "Buttons-Are-Not-Responding", "Controls-and-Indicators-Explained",
        "Understanding-Display-Functions", "What-is-an-OBD-Monitor", "Code-Retrieval-Procedures", "Scanning-ABS"],
        //Tool-PDF\23-1000-001.pdf
        "3568": ["Test1"],
 
        "5568": ["Test2"],
    };

    var pdfFiles = {
        "1000": {
            "RepairSolutions2-Bluetooth-Pairing-Troubleshooting-Guide-For-Android": "./Tool-PDF/23-1000-001.pdf",
            // Add other mappings for the "1000" tool similarly
        },
        "5010": {
            "Tool-not-powering-on": "/path/to/your/Documents/ToolNotPoweringOn.pdf",
            // Add other mappings for the "5010" tool similarly
        }
        // ... and so on for other tools
    };

    function getPDFUrl(tool, reason) {
        if (pdfFiles[tool] && pdfFiles[tool][reason]) {
            return pdfFiles[tool][reason];
        }
        return null; // if not found
    }

    function filterInnovaTools(partType) {
        let toolItems = document.querySelectorAll('.dropdown-menu[aria-labelledby="innovaToolButton"] .dropdown-item');
        toolItems.forEach(item => {
            item.style.display = (partType === '' || item.getAttribute('data-part-type') === partType) ? '' : 'none';
        });
    }

    function updateButtonDisplay(buttonId, newValue, prefix) {
        const button = document.getElementById(buttonId);
        button.innerText = prefix + ": " + newValue;

        const partTypeSelected = document.getElementById('partTypeButton').innerText !== "Part Type:";
        const innovaToolSelected = document.getElementById('innovaToolButton').innerText !== "Innova Tools:";
        const reasonCategorySelected = document.getElementById('reasonCategoryButton').innerText !== "Reason Category:";

        document.getElementById('start-button').disabled = !(partTypeSelected && innovaToolSelected && reasonCategorySelected);
    }

    function updateReasonDropdown(tool) {
        let dropdownItems = document.querySelectorAll('.dropdown-menu[aria-labelledby="reasonCategoryButton"] .dropdown-item');
        dropdownItems.forEach(item => {
            if (item.getAttribute('data-value')) {
                item.style.display = 'none';
            }
        });

        if (toolReasonMapping.hasOwnProperty(tool)) {
            toolReasonMapping[tool].forEach(reason => {
                let item = document.querySelector(`.dropdown-menu[aria-labelledby="reasonCategoryButton"] .dropdown-item[data-value="${reason}"]`);
                if (item) {
                    item.style.display = 'block';
                }
            });
        }
    }

    document.querySelectorAll('.dropdown-menu[aria-labelledby="partTypeButton"] .dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const selectedPart = this.textContent;
            filterInnovaTools(this.getAttribute('data-value'));
            updateButtonDisplay('partTypeButton', selectedPart, 'Part Type');
            updateButtonDisplay('innovaToolButton', 'Select a Tool', 'Innova Tools');
            updateButtonDisplay('reasonCategoryButton', 'Select a Reason', 'Reason Category');
        });
    });

    document.querySelectorAll('.dropdown-menu[aria-labelledby="innovaToolButton"] .dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const selectedTool = this.getAttribute('data-value');
            updateButtonDisplay('innovaToolButton', selectedTool, 'Innova Tools');
            updateReasonDropdown(selectedTool);
            updateButtonDisplay('reasonCategoryButton', 'Select a Reason', 'Reason Category');
        });
    });

    document.querySelectorAll('.dropdown-menu[aria-labelledby="reasonCategoryButton"] .dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const selectedReason = this.textContent;
            if (this.getAttribute('data-value')) {
                updateButtonDisplay('reasonCategoryButton', selectedReason, 'Reason Category');
            }
        });
    });

 
    document.getElementById('start-button').addEventListener('click', function() {
        const selectedToolText = document.getElementById('innovaToolButton').innerText;
        const selectedReasonText = document.getElementById('reasonCategoryButton').innerText;

        const selectedTool = selectedToolText.split(": ")[1];
        const selectedReason = selectedReasonText.split(": ")[1];

        if (selectedTool !== "Select a Tool" && selectedReason !== "Select a Reason") {
            const pdfUrl = getPDFUrl(selectedTool, selectedReason);
            if (pdfUrl) {
                window.open(pdfUrl, '_blank');
            } else {
                alert('No PDF found for the selected tool and reason.');
            }
        } else {
            alert('Please make sure to select both a tool and a reason.');
        }
    });

});
