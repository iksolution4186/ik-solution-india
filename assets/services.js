import { GrAppleAppStore } from "react-icons/gr";
import { FaSalesforce } from "react-icons/fa";
import { SiZoho } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { HiSpeakerphone } from "react-icons/hi";
import { AiOutlineGoogle } from "react-icons/ai";
import { SiAdobeindesign } from "react-icons/si";

const servicesData = [
  {
    title: "Salesforce Development",
    desc: "Driving Innovation through Salesforce Development.",
    serviceUrl: "services/erp-sf",
    serviceImg: <FaSalesforce />,
  },
  {
    title: "ZOHO Development",
    desc: "Building Success with Zoho Technology.",
    serviceUrl: "services/erp-zoho",
    serviceImg: <SiZoho />,
  },
  {
    title: "Digital Marketing",
    desc: "Connecting your brand to the right audience.",
    serviceUrl: "services/digital-marketing",
    serviceImg: <HiSpeakerphone />,
  },
  {
    title: "Graphics / Logo Designing",
    desc: "Designing visuals that tell your brand story.",
    serviceUrl: "services/graphic-designing",
    serviceImg: <SiAdobeindesign />,
  },
  {
    title: "SEO/SEM/SMM",
    desc: "Bringing your brand to the forefront of online searches.",
    serviceUrl: "services/seo-sem-smm",
    serviceImg: <AiOutlineGoogle />,
  },
  {
    title: "Web Development",
    desc: "Innovative web solutions for modern businesses.",
    serviceUrl: "services/web-development",
    serviceImg: <TbBrandNextjs />,
  },
  {
    title: "App Development",
    desc: "Transforming your ideas into functional reality.",
    serviceUrl: "services/app-development",
    serviceImg: <GrAppleAppStore />,
  },
];

export default servicesData;
