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
                    <h3 style={{color: "#2c3e50", marginTop: "30px"}}>What is Urban Heat Island Monitoring and mobile transects?</h3>
                    <p>
                        FILL THIS IN MORE A mobile transect is a research method for urban monitoring. This method uses portable devices, often attached to bikes or helmets, that collect environmental data along a pre-defined route through biking or walking. This approach provides detailed spatial information about the environmental variables.
                    </p>

                </div>

                {/* Right Section */}
                <div style={{flex: 1.5}}>
                    <div style={{display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px"}}>
                        <img
                            src="/park2.png"
                            alt="Park"
                            style={{height: "220px", width: "auto", borderRadius: "8px"}}
                        />
                        <img
                            src="/cityMap.png"
                            alt="City Map"
                            style={{height: "220px", width: "auto", borderRadius: "8px"}}
                        />
                    </div>

                    <p><em>Pictured here is one of few green spaces in Cadiz, Spain. Here you can find many citizens
                        escaping the dense city structures shown in the map image, sitting on benches in the shade.</em>
                    </p>


                    <h3 style={{color: "#2c3e50", marginTop: "20px"}}>Voices from the Community</h3>
                    <p>
                        During our interviews with residents, students, and experts, we gathered firsthand insights on
                        how the Urban Heat Island effect is impacting lives and what actions are being taken. These
                        quotes help illustrate the human side of the issue:
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
                        "Placeholder quote................ ........... ............... ....... .......... ......... ........ ........ ...... ....... ......... ..... ............. ....... ...... ....." - Student
                    </blockquote>

                    <blockquote style={{
                        borderLeft: "4px solid #3498db",
                        paddingLeft: "15px",
                        margin: "20px 0",
                        fontStyle: "italic",
                        color: "#34495e"
                    }}>
                        "Placeholder quote...... .... .  .... . ..... . ...... ...... ......... ..... . ............ . ......... . ... .......... ........ . . ........ . . ........ ......... ......" - City
                        Resident
                    </blockquote>
                    <h3 style={{color: "#2c3e50", marginBottom: "20px"}}>Key Survey Statistics</h3>
                    <ul style={{listStyle: "disc", paddingLeft: "20px", color: "#34495e"}}>
                        <li><strong>Only 51% of people</strong> placeholder stat</li>
                        <li><strong>68% of respondents</strong> placeholder stat</li>
                        <li><strong>72% of people</strong> placeholder stat.</li>
                        <li><strong>1 in 3 residents</strong> placeholder stat.</li>
                        <li><strong>57% of students</strong> placeholder stat</li>
                    </ul>

                    <div style={{flex: 1.5}}>
                        <div style={{display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px"}}>
                            <img
                                src="/willBiking.png"
                                alt="City Map"
                                style={{height: "320px", width: "auto", borderRadius: "8px"}}
                            />
                        </div>

                        <p><em>Pictured here is William Gerlach performing a Mobile Transect by bike in Cadiz, Spain.</em>
                        </p>
                    </div>

                    </div>
            </section>


        </div>
);
}
