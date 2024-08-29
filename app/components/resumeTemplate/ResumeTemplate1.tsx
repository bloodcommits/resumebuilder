import { platform } from "os";
import React, { useEffect, useState } from "react";
import { usePDF } from "react-to-pdf";

const ResumeTemplate1 = () => {
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf', page: { orientation: "p", format: "A4", } });

    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        phone: "",
        email: "",
        age: "",
        location: "",
    });

    const [academicQualifications, setAcademicQualifications] = useState<
        string[]
    >([]);
    const [professionalSummary, setProfessionalSummary] = useState<string[]>([]);
    
    const [professionalExperience, setProfessionalExperience] = useState<{position: "", company: "", description: "",duration: "" } []>([]);

    const [additionalResponsibilities, setAdditionalResponsibilities] = useState<
        string[]
    >([]);
    const [professionalDevelopment, setProfessionalDevelopment] = useState<
        string[]
    >([]);
    const [professionalSkills, setProfessionalSkills] = useState<string[]>([]);
    const [professionalAccolades, setProfessionalAccolades] = useState<string[]>(
        []
    );
    const [projects, setProjects] = useState<{ name: string; url: string; description: string; date: string }[]>([]);

    const [socialLinks, setSocialLinks] = useState<{ platform: string; url: string }[]>([]);

    // Fetch data from local storage when component mounts

    useEffect(() => {
        const jsondata = localStorage.getItem("data");
        if (jsondata) {
            const data = JSON.parse(jsondata);
            console.log(data);

            // Update state with data from local storage
            setPersonalInfo(data.personalInfo);
            setAcademicQualifications(data.academicQualifications);
            setProfessionalSummary(data.professionalSummary);
            setProfessionalExperience(data.professionalExperience);
            setAdditionalResponsibilities(data.additionalResponsibilities);
            setProfessionalDevelopment(data.professionalDevelopment);
            setProfessionalSkills(data.professionalSkills);
            setProfessionalAccolades(data.professionalAccolades);
            setProjects(data.projects);
            setSocialLinks(data.sociallinks);
        }
    }, []);

    return (
        <div className="bg-gray-100 font-sans" >
           <button
            className='bg-blue-300 px-3 py-3 rounded-lg mt-2 ml-2'
            onClick={() => toPDF()}
          >
            <p className='ml-1 text-sm'>Download Template 1</p>
          </button>
            <div className="container mx-auto py-8 px-4 w-[794px]   ">
                <div id="pdf-content" className="bg-white p-6 rounded-lg shadow-lg" ref={targetRef} >
                    <div className="flex justify-between items-center  ">
                        <div>
                            {<h1 className="text-3xl font-semibold">{personalInfo.name}</h1>}
                            <p className="text-gray-600">Web Developer</p>
                        </div>
                        <div>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>{personalInfo.email}</li>
                                {socialLinks?.map((link, index) => (
                                    <li key={index}>{link.platform}: <a className="text-blue-500 hover:underline" href={link.url}>

                                        {!link.url?link.platform:link.url}
                                    
                                    </a></li>
                                ))}

                            </ul>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <h2 className="text-xl font-bold mb-2">Professional summary</h2>
                    <p className="text-gray-700">
                        {!professionalSummary ? <p>not available</p> : professionalSummary}
                    </p>

                    <hr className="my-4" />

                    <h2 className="text-xl font-bold mt-4 mb-2">Experience</h2>
                    {professionalExperience.map((exp, index) => (
                          <div key={index} className="mb-6">
                          <h3 className="text-xl font-semibold">{exp.position}</h3>
                          <p className="text-sm text-gray-500">{exp.company} | {exp.duration}</p>
                          <ul className="list-disc ml-6 mt-2 text-gray-700">
                              <li>{exp.description}</li>
                          </ul>
                      </div>
                    ))}
                        <hr className="my-4" />

                    <h2 className="text-xl font-bold mt-4 mb-2">Skills</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {professionalSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>

                    <hr className="my-4" />

                    <h2 className="text-xl font-bold mt-4 mb-2">Education</h2>
                    {academicQualifications.map((aca, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-gray-700">{aca}</p>
                        </div>
                    ))}

<hr className="my-4" />

                    <h2 className="text-xl font-bold mt-4 mb-2">Projects</h2>
                    <div className="mb-4">
                        {projects?.map((project, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-semibold">{project.name}</h3>
                                <p className="text-gray-700">{project.description}</p>
                                <p className="text-gray-600">{project.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeTemplate1;