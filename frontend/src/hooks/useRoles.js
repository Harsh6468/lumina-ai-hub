import { useEffect, useState } from "react";
import { getRoles, addRole } from "../api/rolesAPI";

const useRoles = () => {
    const [customRoles, setCustomRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCustomRoles();
        const interval = setInterval(loadCustomRoles, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const loadCustomRoles = async() => {
        setLoading(true);
        try {
            const roles = await getRoles();
            setCustomRoles(roles);
        } catch (error) {
            console.error('Error loading custom roles:', error);
            setCustomRoles([]);
        } finally {
            setLoading(false);
        }
    };

    const addNewRole = async (roleData) => {
        try {
            const newRole = await addRole(roleData);
            setCustomRoles(prev => [...prev, newRole]);
            return newRole;
        } catch (error) {
            console.error('Error adding role:', error);
            throw error;
        }
    };

    const updateRole = async (roleId, updatedData) => {
        try {
            const updatedRole = await saveCustomRole({ ...updatedData, id: roleId });
            setCustomRoles(prev => prev.map(role =>
                role.id === roleId ? updatedRole : role
            ));
            return updatedRole;
        } catch (error) {
            console.error('Error updating role:', error);
            throw error;
        }
    };

    const deleteRole = async (roleId) => {
        try {
            await deleteCustomRole(roleId);
            setCustomRoles(prev => prev.filter(role => role.id !== roleId));
        } catch (error) {
            console.error('Error deleting role:', error);
            throw error;
        }
    };
    return {customRoles, loadCustomRoles, addNewRole, updateRole, deleteRole, loading}
}

export default useRoles;
