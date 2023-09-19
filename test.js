document.addEventListener('DOMContentLoaded', function () {
    const toolReasonMapping = {
        // Your existing tool-reason mapping
        // ...
        //... your toolReasonMapping object
        "1000": ["RepairSolutions2-Bluetooth-Pairing-Troubleshooting-Guide-For-Android", "RepairSolutions2-How-To-Report-An-Issue", 
        "How-to-run-a-Report-for-your-Check-Engine-Light", "How-to-reset-your-RepairSolutions2-Password", "Troubleshooting-guide-No-Green-LED-Light-on-the-Dongle",
        "OBDII-ELM327-APPs","RepairSolutions2-App-Subscription-Details", "Understanding-OBDII-DTC-Trouble-Codes", "Searching-for-a-Specific-Error-Code",
        "Accessing-Mode-6-Feature"],
             
        "5010": ["Tool-not-powering-on"],
             
        "5110": ["Erasing-Diagnostic-Trouble-Codes-(DTCs)-with-Innova-5110", "Buttons-Are-Not-Responding", "Controls-and-Indicators-Explained",
        "Understanding-Display-Functions", "What-is-an-OBD-Monitor", "Code-Retrieval-Procedures", "Scanning-ABS"],
 
        "3568": ["Test1"],
 
        "5568": ["Test2"],
     };

         // Mapping for PDF URLs
        var pdfFiles = {

        "1000": {"RepairSolutions2-Bluetooth-Pairing-Troubleshooting-Guide-For-Android": "./Tool-PDF/23-1000-001.pdf",
        
    },
        //... other mappings
        "5010_Tool-not-powering-on": "/path/to/your/Documents/ToolNotPoweringOn.pdf",
        // add paths for other PDFs similarly
    };
 

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
            filterInnovaTools(this.getAttribute('data-value')); // Filtering tools based on part type
            updateButtonDisplay('partTypeButton', selectedPart, 'Part Type');
            updateButtonDisplay('innovaToolButton', 'Select a Tool', 'Innova Tools');  // Reset Innova Tools button text
            updateButtonDisplay('reasonCategoryButton', 'Select a Reason', 'Reason Category');  // Reset Reason Category button text
        });
    });

    document.querySelectorAll('.dropdown-menu[aria-labelledby="innovaToolButton"] .dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const selectedTool = this.getAttribute('data-value');
            updateButtonDisplay('innovaToolButton', selectedTool, 'Innova Tools');
            updateReasonDropdown(selectedTool);
            updateButtonDisplay('reasonCategoryButton', 'Select a Reason', 'Reason Category');  // Reset Reason Category button text
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

    // You can continue here with the code to handle the PDF opening when "Search" is clicked.
});
