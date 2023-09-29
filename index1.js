
        function updateToolSelection(event) {
            event.preventDefault();
            var selectedTool = event.target.getAttribute("data-value");
            var selectToolButton = document.getElementById('innovaToolButton');
            selectToolButton.innerHTML = 'Innova Tools: ' + selectedTool;
            selectToolButton.setAttribute("data-value", selectedTool);
            updateReasonDropdown(selectedTool);
            checkSelection();
        }
    
        function updateReasonDropdown(tool) {
            var reasonDropdown = document.getElementById("reasonCategoryButton").nextElementSibling;
            reasonDropdown.innerHTML = '<a class="dropdown-item" href="#" data-value="">Select a Reason </a>'; 
    
            if (toolReasonMapping.hasOwnProperty(tool)) {
                toolReasonMapping[tool].forEach(reason => {
                    var reasonElement = document.createElement("a");
                    reasonElement.className = "dropdown-item";
                    reasonElement.href = "#";
                    reasonElement.setAttribute("data-value", reason);
                    reasonElement.textContent = reason.replace(/-/g, ' ').replace(tool + '-', '');
                    reasonElement.addEventListener("click", function(e) {
                        e.preventDefault();
                        var selectedReason = e.target.getAttribute("data-value");
                        var selectReasonButton = document.getElementById('reasonCategoryButton');
                        selectReasonButton.innerHTML = 'Reason Category: ' + selectedReason.replace(/-/g, ' ');
                        selectReasonButton.setAttribute("data-value", selectedReason);
                        checkSelection();
                    });
                    reasonDropdown.appendChild(reasonElement);
                });
            }
        }
    
        document.querySelectorAll("#innovaToolButton + .dropdown-menu .dropdown-item").forEach(item => {
            item.addEventListener("click", updateToolSelection);
        });
    
        document.querySelectorAll("#reasonCategoryButton + .dropdown-menu .dropdown-item").forEach(item => {
            item.addEventListener("click", function(e) {
                e.preventDefault();
                var selectedReason = e.target.getAttribute("data-value");
                var selectReasonButton = document.getElementById('reasonCategoryButton');
                selectReasonButton.innerHTML = 'Reason Category: ' + selectedReason.replace(/-/g, ' ');
                selectReasonButton.setAttribute("data-value", selectedReason);
                checkSelection();
            });
        });
    
        function checkSelection() {
            var tool = document.getElementById("innovaToolButton").getAttribute("data-value");
            var reason = document.getElementById("reasonCategoryButton").getAttribute("data-value");
            var startButton = document.getElementById("start-button");
    
            if (tool && reason) {
                startButton.disabled = false;
                startButton.classList.add("ready");
            } else {
                startButton.disabled = true;
                startButton.classList.remove("ready");
            }
        }
    
        function startSearch() {
            var tool = document.getElementById("innovaToolButton").getAttribute("data-value");
            var reason = document.getElementById("reasonCategoryButton").getAttribute("data-value");
            var pdfUrl = getPDFUrl(tool, reason);
            if (pdfUrl) {
                window.open(pdfUrl, "_blank");
                resetSelection();
            }
        }
    
        function resetSelection() {
            document.getElementById("innovaToolButton").setAttribute("data-value", "");
            document.getElementById("innovaToolButton").innerHTML = "Innova Tools";
            document.getElementById("reasonCategoryButton").setAttribute("data-value", "");
            document.getElementById("reasonCategoryButton").innerHTML = "Reason Category";
            checkSelection();
        }
    
        var toolReasonMapping = {
            "1000": ["Pairing-Troubleshooting", "Reoprt-an-Issue", 
            "Running-a-Report", "Password-Reset", "No-Geen-LED",
            "ELM327","Subscription-Details", "OBDII-DTC", "Code-Details",
            "Mode-6",],
            
            "5010": ["No-Power"],
            
            "5110": ["Erasing-DTCs", "Buttons-Not-Responding", "Controls",
            "Understanding-Display-Functions", "What-is-an-OBD-Monitor", "Code-Retrieval-Procedures", "Scanning-ABS"],
            
            "5210": ["What-is-a-hot-key", "Performing-a-battery-&-alternator-test", "Viewing-LED-definitions-using-Innova-5210", "Innova-5210-damaged-usb-port", "Missing-ABS",
            "Controls-and-Indicators", "Display-Functions", "Code-Retrieval-Procedures", "Erasing-DTCs"],
            
            "5310": ["Navigating-to-System-Scans", "Controls-and-Indicators", "Display-Functions", "MIL-Check-Engine", "Anti-Lock-Braking", 
            "Vehicle-Airbag-System", "OEM-Enhanced-DTC", "OEM-Ford/Mazda"],
            
            "5610": ["How-to-Replace-Batteries", "Tool-Not-Linking-to-Vehicle", "Navigating-Innova.com-to-find-tool-manuals", "Cracked-Screen",
            "Aftermarket-OBD1-Extensions-and-Adapters", "Navigating-System-Scans", "Scanning-DTCs-for-MIL", "Anti-Lock-Braking-Systems",
            "Airbag-System", "Tire-Pressure-System", "OEM-Enhanced-DTCs"],
            
            "7111": ["Step-by-Step-Guide-to-Update-your-Innova-7111-Tablet", "Battery-Troubleshooting-Guide", "Troubleshooting-Vehicle-Communication-Interface-(VCI)-Connector-Errors-on-Innova-7111-Scan-Tool",
            "Turning-off-the-Oil-Warning-Light-using-Innova-7111-Tablet", "Using-Special-Function-with-Innova-7111-Scan-Tool-Tablet", "Performing-ABS-Bleeding-with-Innova-7111-Tablet",
            "How-To-Perform-Electronic-Parking-Brake-(EPB)-Calibration", "Perform-the-Steering-Angle-Sensor-Calibration-Function", "Transmission-Fluid-Temperature",
            "Step-by-Step-Guide-for-Troubleshooting-SDS-7111-Stuck-at-99%", "Dead-Battery", "Cracked-Screen", "Clearing-CEL/MIL", "Battery-Replacement"],

            "Basic-Info": ["Trade-In", "Vehicle-Routines", "Trouble-Codes", "ABS", "Bi-Directional", "DPF", "Module-Scan", "Mode-6", "TroubleShooting-Guide", "Scratched-Screen",],
        };
    
        function getPDFUrl(tool, reason) {
            var pdfFiles = {
                "1000": {
                    "Pairing-Troubleshooting": "./Tool-PDF/23-1000-001.1.pdf",
                    "Reoprt-an-Issue": "./Tool-PDF/23-1000-002.pdf",
                    "Running-a-Report": "./Tool-PDF/23-1000-003.pdf",
                    "Password-Reset": "./Tool-PDF/23-1000-004.pdf",
                    "No-Geen-LED":"./Tool-PDF/23-1000-005.1.pdf",
                    "ELM327": "./Tool-PDF/23-1000-006.pdf",
                    "Subscription-Details": "./Tool-PDF/23-1000-007.pdf",
                    "OBDII-DTC": "./Tool-PDF/23-1000-008.pdf",
                    "Code-Details": "./Tool-PDF/23-1000-009.pdf",
                    "Mode-6": "./Tool-PDF/23-1000-010.pdf",

                },

                "5010": {
                    "No-Power": "./Tool-PDF/23-5010-001.pdf"
                },

                "5110": {
                    "Erasing-DTCs": "./Tool-PDF/23-5110-001.pdf",
                    "Buttons-Not-Responding": "./Tool-PDF/23-5110-002.pdf",
                    "Controls": "./Tool-PDF/23-5110-003.1.pdf",
                    "Understanding-Display-Functions": "./Tool-PDF/23-5110-004.pdf",
                    "What-is-an-OBD-Monitor": "./Tool-PDF/23-5110-005.pdf",
                    "Code-Retrieval-Procedures": "./Tool-PDF/23-5110-006.pdf",
                    "Scanning-ABS": "./Tool-PDF/23-5110-007.pdf",


                },

                "5210": {
                    "What-is-a-hot-key": "./Tool-PDF/23-5210-001.pdf",
                    "Performing-a-battery-&-alternator-test": "./Tool-PDF/23-5210-002.pdf",
                    "Viewing-LED-definitions-using-Innova-5210": "./Tool-PDF/23-5210-003.pdf",
                    "Innova-5210-damaged-usb-port": "./Tool-PDF/23-5210-004.pdf",
                    "Controls-and-Indicators": "./Tool-PDF/23-5210-005.1.pdf",
                    "Display-Functions": "./Tool-PDF/23-5210-006.pdf",
                    "Code-Retrieval-Procedures": "./Tool-PDF/23-5210-007.pdf",
                    "Erasing-DTCs": "./Tool-PDF/23-5210-008.pdf", 
                    "Missing-ABS": "./Tool-PDF/23-5210-009.1.pdf"
                    },

                "5310": {
                    "Navigating-to-System-Scans": "./Tool-PDF/23-5310-001.pdf",
                    "Controls-and-Indicators": "./Tool-PDF/23-5310-002.1.pdf",
                    "Display-Functions": "./Tool-PDF/23-5310-003.pdf",
                    "MIL-Check-Engine": "./Tool-PDF/23-5310-004.pdf",
                    "Anti-Lock-Braking": "./Tool-PDF/23-5310-005.pdf",
                    "Vehicle-Airbag-System": "./Tool-PDF/23-5310-006.pdf",
                    "OEM-Enhanced-DTC": "./Tool-PDF/23-5310-007.pdf",
                    "OEM-Ford/Mazda": "./Tool-PDF/23-5310-008.1.pdf"
                },

                "5610": {
                    "How-to-Replace-Batteries": "./Tool-PDF/23-5610-001.pdf",
                    "Tool-Not-Linking-to-Vehicle": "./Tool-PDF/23-5610-002.pdf",
                    "Navigating-Innova.com-to-find-tool-manuals": "./Tool-PDF/23-5610-003.pdf",
                    "Cracked-Screen": "./Tool-PDF/23-5610-004.pdf",
                    "Aftermarket-OBD1-Extensions-and-Adapters": "./Tool-PDF/23-5610-005.pdf",
                    "Navigating-System-Scans": "./Tool-PDF/23-5610-006.pdf",
                    "Scanning-DTCs-for-MIL": "./Tool-PDF/23-5610-007.pdf",
                    "Anti-Lock-Braking-Systems": "./Tool-PDF/23-5610-008.pdf",
                    "Airbag-System": "./Tool-PDF/23-5610-009.pdf",
                    "Tire-Pressure-System": "./Tool-PDF/23-5610-010.pdf",
                    "OEM-Enhanced-DTCs": "./Tool-PDF/23-5610-011.pdf",

                },

                "7111": {
                    "Step-by-Step-Guide-to-Update-your-Innova-7111-Tablet": "./Tool-PDF/23-7111-001.pdf",
                    "Battery-Troubleshooting-Guide": "./Tool-PDF/23-7111-002.pdf",
                    "Troubleshooting-Vehicle-Communication-Interface-(VCI)-Connector-Errors-on-Innova-7111-Scan-Tool": "./Tool-PDF/23-7111-003.pdf",
                    "Turning-off-the-Oil-Warning-Light-using-Innova-7111-Tablet": "./Tool-PDF/23-7111-004.pdf",
                    "Using-Special-Function-with-Innova-7111-Scan-Tool-Tablet": "./Tool-PDF/23-7111-005.pdf",
                    "Performing-ABS-Bleeding-with-Innova-7111-Tablet": "./Tool-PDF/23-7111-006.pdf",
                    "How-To-Perform-Electronic-Parking-Brake-(EPB)-Calibration": "./Tool-PDF/23-7111-007.pdf",
                    "Perform-the-Steering-Angle-Sensor-Calibration-Function": "./Tool-PDF/23-7111-008.pdf",
                    "Transmission-Fluid-Temperature": "./Tool-PDF/23-7111-009.pdf",
                    "Step-by-Step-Guide-for-Troubleshooting-SDS-7111-Stuck-at-99%": "./Tool-PDF/23-7111-010.pdf",
                    "Dead-Battery": "./Tool-PDF/23-7111-011.pdf",
                    "Cracked-Screen": "./Tool-PDF/23-7111-012.pdf",
                    "Clearing-CEL/MIL": "./Tool-PDF/23-7111-013.pdf",
                    "Battery-Replacement": "./Tool-PDF/23-7111-014.pdf",
                },

                "Basic-Info": {
                    "Trade-In": "./Tool-PDF/23-info-001.pdf",
                    "Vehicle-Routines": "./Tool-PDF/23-info-002.pdf",
                    "Trouble-Codes": "./Tool-PDF/23-info-003.pdf",
                    "ABS": "./Tool-PDF/23-info-004.pdf",
                    "Bi-Directional": "./Tool-PDF/23-info-005.pdf",
                    "DPF": "./Tool-PDF/23-info-006.pdf",
                    "Module-Scan": "./Tool-PDF/23-info-007.pdf",
                    "Mode-6": "./Tool-PDF/23-info-008.pdf",
                    "TroubleShooting-Guide": "./Tool-PDF/23-info-009.pdf",
                    "Scratched-Screen": "./Tool-PDF/23-info-010.pdf",
        
                }
            };
    
            if (pdfFiles.hasOwnProperty(tool) && pdfFiles[tool].hasOwnProperty(reason)) {
                var filePath = pdfFiles[tool][reason];
                return filePath + '#page=1';
            } else {
                return null;
            }
        }
