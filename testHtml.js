const htmlData = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Assessment - 8862928826</title>
</head>

<style>
    html, body {margin: 0; font-family: sans-serif;}
    header, main {padding-inline: 18px;}

    /* Page Header */
    header { display: flex; justify-content: space-between; padding-block: 12px; background: linear-gradient(270deg, #008C65 0%, #124733 100%);}
    hr { height: 2px; background-color: #D9D9D9; margin-block: 12px; border: unset;}

    .doc-container {
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: flex-end;
        color: white;
    }

    /* -------- */

    .main-heading {
        color: #124733;
        font-weight: 600;
        text-align: center;
    }

    .sub-heading {
        color: #008C65;
        font-weight: 600;
        margin-block: 2px;
    }

    /* Main Section */
    main { display: flex; flex-direction: column; gap: 30px;}

    .details-grid {display: grid; grid-template-columns:repeat(2, 1fr); column-gap: 25px; row-gap: 20px;}

    .details-grid>div {display: flex; justify-content: space-between;}

    .detail-title {
        display: flex;
        align-items: center;
        color: #828282;
    }

    .detail-value {color: #1D1D1F;}

    .detail-title-bold {font-weight: bold; color: #1D1D1F;}

    #health-status-bar{
        width: 70%;
    }

    /* ------------- */

    .vaccination-container {display: flex; flex-direction: column; gap: 20px;}

    .vaccine-row {display: flex; justify-content: space-between;}

    #vaccination-progress-bar{
        width: 70%;
    }

    /* Progress Bar */

    .progress-container{
        display: flex;
        border: 1px solid #D9D9D9;
        border-radius: 14px;
        padding: 3px;
    }

    .positive-progress, .negative-progress {
        border-radius: 12px;
        text-align: center;
        padding: 3px;
        font-size: 14px;
    }

    .positive-progress {
        background-color: #008C65;
        color: #FFFFFF;
    }

    .negative-progress {
        position: relative;
        z-index: -1;
        background-color: #ffc9c9f5;
        color: #124733;
    }

    .negative-progress::before{
        content: '';
        position: absolute;
        background-color: inherit;
        height: 100%;
        top: 0;
        width: 30px;
        left: -15px;
        z-index: -1;
    }

    /* Health Issue */

    .health-issue-container {
        display: flex;
        width: 75%;
        row-gap: 10px;
        column-gap: 15px;
        flex-wrap: wrap;
    }

    .health-issue-card {
        background-color: #F3F1E4;
        border-radius: 25px;
        padding: 12px;
        color: #1D1D1F;
    }


    /* Footer */
    footer{ display:flex; flex-direction:column; gap:6px; color:#828282; margin-bottom:20px; font-size: 14px;}
    
    .tnc-heading {font-size: 18px;}
    
    .mail {color: inherit;text-decoration: underline;}

    /* ---------- */

</style>

<body>
    <div>
    <header>
        <span>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcAAACNCAMAAAA0GJ7+AAAAn1BMVEUAAADF3L////////////9coUf///////////9Xnkf///////////9Um0X///////9zsE5Ik0L///////94tFH///9CkED///9PmET///9+uFP///9boEf///9Bj0D///9+uFRdokn///9WnUb///9/uFVCkUH///////////+Hv1t+ulh2tFRtrlBmqExfo0lYnkdRmkVKlUJDkD86iTwXaozvAAAAKXRSTlMABAgPFhYfKDAwNj5ISlNgYGhteHyDh5Sbo6uwtL7Ay8vN2ePl6erv+GspYPcAAAzTSURBVHja7ZwLd5s4FoAtwIABQy2iEEKIGplGOHHapsn//22LXr4QMbW7xxvwTq/nnKldQfXpPnT1XPyVf5OEeV9IcqkcZDeQ2rlMDKcecjTBZXIEzZCjTS+TI213QyEX7B6X7yDgHuAgl+4e4CCX7x7zdxB3zO6Rco/jDoLcmWD4ZRWNu8cpDhIUdTQPjGq348Qfc4/jDuJhttuxeA7urNqdYdd2j2MO4iT64WRyjJCatq4T1K9isRuR2h88W3JjcFODRBQqyYvAOH5Maj7G0dIi9Yw9kqbnOem0GGzox7knKogBYgyFhKhDzejw0WxCjERjgNA0JGx3RJoyTqqP7sOz6TDGQhLfnSB8pBTHaBqMDDDOIm3uTIGRQpueDWQSqzo7x24SDkTOjVG70yQk9LwYDaQnl+gh02f1qDirVXmTcfjsfBh8yhQra49UjtVlQQgpK9ocKUrQhBxO+dv0A0eeYwZ9QVqw36BQb9rRB/vHdBAHH1vYyyo+L6sCweNtTDN3VH9JNV6+QBNzuNVY6xLvH8tnbAzbX0wtSWvXKvmtKY6Q5zOc/dxVwREVFu3UGYktYWNh2DaFlmjgJeQjSJvNRx2AYctqtRiCzE0hATvFY5311QfTKmc29YtPy1mvvi6P5MolmjTq1icFnuXt08qaxZ7TmkLET8ku0JdvT1fHMho8FYPjJ3l9SthBy6/PT7foSBMwkgaf7ezIDdOiZke6AbCq56fnb8uP7yitlKypiyzy0GepIcYlhcY8Zhuow3h+fnpa24nAeKZf5Yn/v1dMYqnhiK+uOgwBcmXFCAhZtmJy9OlpCEjljLj4V4kBDnLaq2pnQo7cdo2rb897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" 
                height="45px"
                alt="logo"
            >
        </span>
        <div class="doc-container">
            <span>Dr. Sandeep Jain</span>
            <span>Vetinary</span>
            <span>ID proof:N/A</span>
        </div>
    </header>
    <main>
        <h2 class="main-heading">Customer Assessment Details</h2>
        <section>
            <h3 class="sub-heading">Customer Details</h3>
            <hr/>
            <div class="details-grid">
                <div>
                    <span class="detail-title">Name</span>
                    <span class="detail-value">Aditya raj</span>
                </div>
                <div>
                    <span class="detail-title">Father's Name</span>
                    <span class="detail-value">Rajesh kumar</span>
                </div>
                <div>
                    <span class="detail-title">Contact Number</span>
                    <span class="detail-value">8862928826</span>
                </div>
                <div>
                    <span class="detail-title">Alternate Number</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Location</span>
                    <span class="detail-value">house no 1145 Maruti vihar</span>
                </div>
                    <div>
                    <span class="detail-title">Milk Sale to VITA (Lr)</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Vita Collection Centre</span>
                    <span class="detail-value"></span>
                </div>
            </div>
        </section>
        <section>
            <h3 class="sub-heading">Address Details</h3>
            <hr />
            <div class="details-grid">
                <div>
                    <span class="detail-title">Pincode</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Landmark</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Plot/House No.</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Area, Street, Village</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">City/Town</span>
                    <span class="detail-value">N/A</span>
                </div>
                </div>
        </section>
        <section>
            <h3 class="sub-heading">LiveStock Assessment Details</h3>
            <hr />
            <div class="details-grid">
                <div style="grid-column: 1 / -1;">
                    <span class="detail-title">Cattle Health Status</span>
                    <div class="progress-container" id="health-status-bar">
                        <div class="positive-progress" style="flex: 0">0%</div>
                        <div class="negative-progress" style="flex: 100">100%</div>
                    </div>
                </div>
                <div>
                    <span class="detail-title">Breed Count</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Count of Calves</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Count of Cows</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Count of Males</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title">Count of Buffaloes</span>
                    <span class="detail-value">N/A</span>
                </div>
                <div>
                    <span class="detail-title-bold">Total Count</span>
                    <span class="detail-value">N/A</span>
                </div>
            </div>

        </section>

        <section>
            <h3 class="sub-heading">Cattle Vaccination Details</h3>
            <hr />            
            <div class="vaccination-container">
                        <div class="vaccine-row">
                            <span class="detail-title">Vacc1</span>
                            <div class="progress-container" id="vaccination-progress-bar">
                                <div class="positive-progress" style="flex: 0">0%</div>
                                <div class="negative-progress" style="flex: 100">100%</div>
                            </div>
                        </div>
                        <div class="vaccine-row">
                            <span class="detail-title">Vacc2</span>
                            <div class="progress-container" id="vaccination-progress-bar">
                                <div class="positive-progress" style="flex: 0">0%</div>
                                <div class="negative-progress" style="flex: 100">100%</div>
                            </div>
                        </div>
                        <div class="vaccine-row">
                            <span class="detail-title">Vacc3</span>
                            <div class="progress-container" id="vaccination-progress-bar">
                                <div class="positive-progress" style="flex: 0">0%</div>
                                <div class="negative-progress" style="flex: 100">100%</div>
                            </div>
                        </div>
                        <div class="vaccine-row">
                            <span class="detail-title">Vacc4</span>
                            <div class="progress-container" id="vaccination-progress-bar">
                                <div class="positive-progress" style="flex: 0">0%</div>
                                <div class="negative-progress" style="flex: 100">100%</div>
                            </div>
                        </div>
            </div>
        </section>
    
        <section>
            <h3 class="sub-heading">Cattle Health Issues Identified</h3>
            <hr />            
            <div class="health-issue-container">
            </div>                
        </section>


        <footer>
            <div class="tnc-heading">Terms & Conditions</div>
            <div>© 2024 GrowAgro Life Science Private Limited. All rights reserved. Access to this veterinary medical report is subject to our terms and conditions. Any unauthorized use or reproduction is strictly prohibited. For inquiries, contact us at <a class="mail" href="mailto:info@growagro.in" target="_blank">info@growagro.in.</a></div>
            <span style="font-size:x-small; color:#828282">Created At: Thu May 02 2024 16:11:51 GMT+0530 (India Standard Time)</span>
        </footer>
    </main>
    </div>

</body>

</html>
`

module.exports = { htmlData }