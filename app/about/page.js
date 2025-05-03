export default function ProjectPage() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
            <div style={{ maxWidth: "1250px", margin: "0 auto" }}>

                {/* Live Google Doc Preview */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ color: "#2c3e50" }}>Manual Document Preview</h2>

                    <div style={{ marginBottom: "10px" }}>
                        <a
                            href="https://docs.google.com/document/d/e/2PACX-1vSlb-batBXVobfSLbGpriAd2OLsOx_CL8nFEMcehUvmyROQdscmTyoUI7FLVAKOoOKRh8yIoQ_mUEY2/pub"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-block",
                                backgroundColor: "#9ebbd8",
                                color: "#fff",
                                padding: "10px 16px",
                                borderRadius: "6px",
                                textDecoration: "none",
                                fontWeight: "bold"
                            }}
                        >
                            Open Full Report in New Tab
                        </a>
                    </div>

                    <div style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
                        <iframe
                            src="https://docs.google.com/document/d/e/2PACX-1vSlb-batBXVobfSLbGpriAd2OLsOx_CL8nFEMcehUvmyROQdscmTyoUI7FLVAKOoOKRh8yIoQ_mUEY2/pub?embedded=true"
                            style={{ width: "100%", height: "600px", border: "none" }}
                            title="Urban Environment IQP Report"
                        ></iframe>
                    </div>
                </section>

                {/* Team Section */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ color: "#2c3e50" }}>About the Team</h2>
                    <div style={{ marginTop: "30px" }}>
                        <img src="/GroupPicture.png" alt="Group Picture"
                             style={{ width: "100%", maxWidth: "400px", height: "auto", borderRadius: "8px" }} />
                    </div>
                    <p>Email: gr-UrbanEnvC25@wpi.edu</p>
                    <p>
                        <strong>Joshua Bemis:</strong> Josh is an Aerospace Engineering BS/MS student from Haverhill, MA.
                        Going to his family’s lake house every summer, Josh has developed an appreciation for the outdoors.
                        Combining his technical skills learned at WPI with a passion for being outside, Josh was excited
                        for the opportunity to work on a multidisciplinary project. Josh looks forward to collecting valuable
                        data that could make an impact on environmental policy in Southern Spain.
                    </p>
                    <p>
                        <strong>Mia Frattasio:</strong> Mia is a Computer Science and Data Science student at WPI, with a
                        concentration in Cybersecurity. Growing up on a river in Massachusetts and spending free time kayaking
                        sparked her love for the outdoors and a strong connection to the environment. She is passionate about
                        protecting the Earth and understanding the changes it's going through. This project gave her the
                        opportunity to combine her technical skills with something she cares about - Urban Heat Islands.
                    </p>
                    <p><strong>William Gerlach:</strong> Will is an Electrical Engineering student from Falmouth, MA. Growing up in a community increasingly affected by sea level rise and coastal erosion, he developed a strong interest in how infrastructure can evolve to help communities adapt to climate change. This project offered Will the opportunity to apply his engineering skills to real-world data collection, explore the impacts of climate on urban environments, and contribute to broader efforts toward more climate-resilient cities.</p>
                    <p>
                        <strong>Jorge Saa:</strong> Jorge is a Mechanical Engineering BS/MS student born in Santo Domingo,
                        Dominican Republic. Growing up in Panama City, Panama while visiting family in the countryside of
                        Colombia every year led to his appreciation of the outdoors, noticing the difference in air quality
                        and the peacefulness of nature in comparison to the city. Jorge is interested in using his technical
                        skills and engineering knowledge towards helping people around the world. This project gave him the
                        opportunity to do so in a continent and region different to his own while learning as he worked on a team.
                    </p>
                </section>


                {/* Sponsor Section */}
                <section style={{ marginBottom: "40px" }}>
                    <h2 style={{ color: "#2c3e50" }}>Our Sponsor</h2>
                    <h3>Laura Romero Rodriguez</h3>
                    <div style={{ marginTop: "30px" }}>
                        <img src="/ODS.png" alt="Sponsor Picture"
                             style={{ width: "100%", maxWidth: "400px", height: "auto", borderRadius: "8px" }} />
                    </div>
                    <p>
                        Professor <strong>Laura Romero Rodríguez</strong> is a University Lecturer at the University of
                        Cádiz, specializing in Thermal Machines and Engines. She earned her doctorate from the University of
                        Seville, with research focused on energy-efficient districts and demand-side management. Her work includes
                        urban energy simulation, photovoltaic potential assessment, and mitigating energy poverty. You can explore
                        her academic contributions at her <a
                        href="https://scholar.google.com/citations?user=s6ZA-CUAAAAJ&hl=en"
                        target="_blank"
                        rel="noopener noreferrer">Google Scholar profile</a>.
                    </p>
                    <p>Email: laura.romero@uca.es</p>
                </section>
            </div>
        </div>
    );
}
