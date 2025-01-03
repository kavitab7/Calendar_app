import companies from "../mockData/companies.json";
import methods from "../mockData/methods.json";
import interactions from "../mockData/interactions.json";

export const getCompanies = () => {
    return [...companies];
};

export const addCompany = (newCompany) => {
    if (!newCompany || !newCompany.id || !newCompany.name) {
        throw new Error("Invalid company data");
    }
    return [...companies, newCompany];
};

export const updateCompany = (updatedCompany) => {
    const index = companies.findIndex((c) => c.id === updatedCompany.id);
    if (index === -1) {
        throw new Error(`Company with ID ${updatedCompany.id} not found`);
    }
    const updatedCompanies = [...companies];
    updatedCompanies[index] = updatedCompany;
    return updatedCompanies;
};

export const deleteCompany = (companyId) => {
    const index = companies.findIndex((c) => c.id === companyId);
    if (index === -1) {
        throw new Error(`Company with ID ${companyId} not found`);
    }
    const updatedCompanies = [...companies];
    updatedCompanies.splice(index, 1);
    return updatedCompanies;
};

export const getCommunicationMethods = () => {
    return [...methods];
};

export const getInteractions = () => {
    return [...interactions];
};

export const addInteraction = (newInteraction) => {
    if (!newInteraction || !newInteraction.id || !newInteraction.type) {
        throw new Error("Invalid interaction data");
    }
    return [...interactions, newInteraction];
};
