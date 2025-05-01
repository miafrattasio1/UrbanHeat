export default function AboutPage() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
            <section style={{ maxWidth: "1250px", margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
                {/* Left Section */}
                <div style={{flex: 2, marginRight: "30px"}}>

                    <h3 style={{color: "#2c3e50"}}>What is an Urban Heat Island?</h3>
                    <p>
                        An Urban Heat Island (UHI) is a phenomenon where urban areas experience significantly higher
                        temperatures than nearby rural regions. This temperature difference is mainly due to the
                        abundance of dense structures like buildings and roads, which absorb and retain more heat from
                        the sun compared to natural landscapes. These materials release heat slowly, keeping cities
                        warmer, especially at night.
                    </p>
                    <p>
                        Additionally, urban environments typically have less vegetation and fewer bodies of water,
                        both of which help cool the air. Human activities, such as vehicle traffic and industrial
                        operations, also contribute to the UHI effect by generating additional heat.
                    </p>

                    <h3 style={{color: "#2c3e50", marginTop: "30px"}}>What are the consequences of a UHI?</h3>
                    <p>
                        Urban Heat Islands can lead to a wide range of consequences that affect both human well-being
                        and the environment:
                    </p>

                    <ul>
                        <li>
                            <strong>Increased heat-related illness and death:</strong> Prolonged exposure to high
                            temperatures
                            in cities can cause heat exhaustion, heatstroke, and even death. According to the CDC,
                            extreme heat kills more people in the U.S. each year than any other weather-related event.
                            Vulnerable populations, including the elderly, infants, people with chronic illnesses, and
                            those without access to air conditioning, are most at risk.
                        </li>

                        <li>
                            <strong>Worsening climate change effects:</strong> UHIs amplify the impact of climate change
                            by
                            increasing local temperatures and energy demand. As cities rely more on air conditioning
                            to stay cool, fossil fuel consumption may rise, releasing more greenhouse gases and
                            further warming the planet in a dangerous feedback loop.
                        </li>

                        <li>
                            <strong>Increased energy consumption:</strong> Higher temperatures drive up the use of air
                            conditioning, especially during summer. This can lead to peak electricity demand,
                            overloading power grids, raising utility bills, and increasing carbon emissions if energy
                            sources are not renewable.
                        </li>

                        <li>
                            <strong>Environmental injustice:</strong> Not all communities are affected equally.
                            Low-income
                            neighborhoods and communities of color often have fewer trees, more asphalt, and limited
                            access to cooling infrastructure, making them disproportionately hotter and more vulnerable
                            to the health impacts of extreme heat.
                        </li>

                        <li>
                            <strong>Air quality deterioration:</strong> Higher urban temperatures increase ground-level
                            ozone
                            and smog, worsening air quality. This exacerbates respiratory issues like asthma,
                            especially in children and older adults.
                        </li>

                        <li>
                            <strong>Negative impacts on water and ecosystems:</strong> Hotter surfaces lead to warmer
                            stormwater runoff, which can disrupt aquatic life in nearby rivers and lakes. In addition,
                            stressed urban vegetation may struggle to survive, reducing biodiversity and the natural
                            cooling benefits plants provide.
                        </li>
                    </ul>
                    <h3 style={{color: "#2c3e50", marginTop: "30px"}}>What are Urban Heat Island Monitoring and Mobile
                        Transects?</h3>
                    <p>
                        Urban Heat Island (UHI) monitoring involves collecting temperature and other environmental data across
                        a city to better understand how heat is distributed in different neighborhoods. By identifying
                        urban "hot spots", researchers and planners can develop more targeted strategies to reduce heat
                        exposure and improve community resilience.
                    </p>
                    <p>
                        One innovative method for UHI monitoring is the use of <strong>mobile transects</strong>. A
                        mobile transect involves traveling along a fixed route, often by bicycle, scooter, or on
                        foot, while carrying portable sensors that record data such as air temperature, humidity, and light intensity, in real time.
                    </p>
                    <p>
                        Compared to stationary weather stations, mobile transects offer a much higher spatial
                        resolution. They allow researchers to observe how heat varies from block to block, identifying
                        microclimates within the city. For example, a tree-lined street may be significantly cooler than
                        a nearby area of tightly packed buildings.
                    </p>
                    <p>
                        The data collected from mobile transects is extremely important for informing urban planning decisions, such
                        as where to plant more trees, or install green roofs. It also helps
                        communities advocate for environmental equity by highlighting areas that are disproportionately
                        burdened by extreme heat.
                    </p>


                </div>

                {/* Right Section */}
                <div style={{flex: 1.5}}>
                    <div style={{display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px"}}>
                        <img
                            src="/park3.png"
                            alt="Park"
                            style={{
                                height: "300px",
                                width: "320px", // Fixed smaller width
                                objectFit: "cover", // Crops instead of scaling
                                objectPosition: "center", // Keeps the center in view
                                borderRadius: "8px"
                            }}
                        />

                        <img
                            src="/cityMap.png"
                            alt="City Map"
                            style={{height: "300px", width: "auto", borderRadius: "8px"}}
                        />

                    </div>

                    <p><em>Pictured is a green space in Cádiz, Spain. Plaza de Mina offers a peaceful retreat from the surrounding dense urban landscape, as shown in the accompanying map. Locals can often be seen relaxing in the shade on hot, sunny days.</em>
                    </p>


                    <h3 style={{color: "#2c3e50", marginTop: "20px"}}>Voices from the Community</h3>
                    <p>
                        During our interviews with residents, students, and experts, we gathered firsthand insights on
                        how the Urban Heat Island effect is impacting lives and what actions are being taken. These
                        quotes and stories help illustrate the human side of the issue:
                    </p>

                    <blockquote style={{
                        borderLeft: "4px solid #3498db",
                        paddingLeft: "15px",
                        margin: "20px 0",
                        fontStyle: "italic",
                        color: "#34495e"
                    }}>
                        "Last summer, not in 2024, but in the summer of 2023, let's say, we had a continuous heat wave
                        that lasted practically a month and a half, with one after the other. I think it affected
                        tourism significantly. In many cities here in southern Spain, it was practically impossible to
                        go outside before 10:00 p.m. At night, temperatures didn't drop below 28-30°C, so tropical
                        nights are one after the other without stopping, and I think it affected them quite a bit." -
                        University Professor, Andalusia
                    </blockquote>

                    <blockquote style={{
                        borderLeft: "4px solid #3498db",
                        paddingLeft: "15px",
                        margin: "20px 0",
                        fontStyle: "italic",
                        color: "#34495e"
                    }}>
                        Many interviewees are aware of the changes in heat, and concluded that extreme temperatures in the summer have led to what they call "horas muertas" ("dead hours"). This means that while the sun and the temperatures are at their apex, the streets will be "dead" as people will be home protecting themselves from the heat. These dead hours have led to loss in productivity and affected business hours.
                    </blockquote>

                    <h3 style={{color: "#2c3e50", marginBottom: "20px"}}>Key Survey Statistics</h3>
                    <ul style={{listStyle: "disc", paddingLeft: "20px", color: "#34495e"}}>
                        <li><strong>Only 20.7% of respondents</strong> believe they are well informed on Spain's policy on climate change.</li>
                        <li><strong>89.7% of respondents</strong> indicated that they have adjusted their daily schedules due to high temperatures.</li>
                        <li><strong>Only 51.7% of respondents</strong> say they have proper, working cooling systems at their place of work/study.</li>
                    </ul>

                    <h3 style={{color: "#2c3e50", marginBottom: "20px"}}>Our Mobile Transects</h3>
                    <div style={{flex: 1.5}}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-start",
                                gap: "20px",
                                marginTop: "30px",
                            }}
                        >
                            <img
                                src="/willBiking.png"
                                alt="City Map"
                                style={{height: "320px", width: "auto", borderRadius: "8px"}}
                            />
                            <img
                                src="/jorgePic.png"
                                alt="Walking Transect"
                                style={{height: "320px", width: "auto", borderRadius: "8px"}}
                            />
                        </div>

                        <p>
                            <em>
                                Pictured here is William Gerlach performing a Biking Mobile Transect by
                                bike in Cadiz, Spain, and Jorge Saa performing a Walking Mobile Transect
                                in Cadiz, Spain.
                            </em>
                        </p>
                    </div>


                </div>
            </section>


        </div>
    );
}
