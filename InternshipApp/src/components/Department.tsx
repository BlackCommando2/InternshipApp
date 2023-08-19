import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Checkbox,
    IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export interface SubDepartment {
    name: string;
    selected: boolean;
}

export interface Department {
    department: string;
    sub_departments: SubDepartment[];
    selected: boolean;
}

export interface DepartmentComponentProps {
    departments: Department[];
}

const DepartmentComponent: React.FC<DepartmentComponentProps> = ({ departments }) => {
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleToggle = (id: string) => {
        if (expandedIds.includes(id)) {
            setExpandedIds(expandedIds.filter((expandedId) => expandedId !== id));
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    };

    const renderSubDepartments = (subDepartments: SubDepartment[], dept: Department) => (
        <List component="div" disablePadding>
            {subDepartments.map((subDept) => (
                <ListItem key={subDept.name} sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <Checkbox
                            edge="end"
                            checked={selectedIds.includes(subDept.name)}
                            onChange={() => handleSubDepartmentToggle(dept, subDept)}
                        />
                    </ListItemIcon>
                    <ListItemText primary={subDept.name} />
                </ListItem>
            ))}
        </List>
    );

    const handleSubDepartmentSelection = (dept: Department) => {
        const allSubDepartmentsSelected = dept.sub_departments.every((subDept) =>
            selectedIds.includes(subDept.name)
        );
        if (allSubDepartmentsSelected) {
            setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.filter((name) => !dept.sub_departments.map((subDept) => subDept.name).includes(name))
            );
            setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((name) => name !== dept.department));
        } else {
            setSelectedIds((prevSelectedIds) => [
                ...prevSelectedIds,
                ...dept.sub_departments.map((subDept) => subDept.name),
                dept.department,
            ]);
        }
    };

    const handleDepartmentToggle = (dept: Department) => {
        const updatedDepartments = departments.map((d) =>
            d.department == dept.department ? { ...dept, selected: !d.selected } : { ...d }
        );

        setSelectedIds((prevSelectedIds) => {
            return dept.selected
                ? prevSelectedIds.filter((name) => name !== dept.department)
                : [...prevSelectedIds, dept.department]
        }
        );
        return updatedDepartments;
    };


    const handleSubDepartmentToggle = (dept: Department, subDept: SubDepartment) => {
        const updatedSubDepartments = dept.sub_departments.map((sd) =>
            sd.name === subDept.name ? { ...sd, selected: !subDept.selected } : sd
        );

        const updatedDepartment = { ...dept, sub_departments: updatedSubDepartments };

        if (updatedSubDepartments.every((subDept) => subDept.selected)) {
            setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.filter((name) => name !== subDept.name)
            );
            setSelectedIds((prevSelectedIds) =>
                prevSelectedIds.filter((name) => name !== dept.department)
            );
        } else {
            setSelectedIds((prevSelectedIds) => {
                if (prevSelectedIds.includes(subDept.name)) {
                    return prevSelectedIds.filter((name) => name !== subDept.name);
                } else {
                    return [...prevSelectedIds, subDept.name];
                }
            });
            setSelectedIds((prevSelectedIds) => {
                if (!prevSelectedIds.includes(dept.department)) {
                    return [...prevSelectedIds, dept.department];
                }
                return prevSelectedIds;
            });
        }

        return handleDepartmentToggle(updatedDepartment);
    };


    return (
        <div>
            {departments.map((dept) => (
                <List key={dept.department} component="div" disablePadding>
                    <ListItem>
                        <ListItemButton onClick={() => handleToggle(dept.department)}>
                            <ListItemText primary={dept.department} />
                            <ListItemIcon>
                                <Checkbox
                                    edge="end"
                                    checked={
                                        dept.selected ||
                                        dept.sub_departments.every((subDept) => selectedIds.includes(subDept.name))
                                    }
                                    onChange={() => handleSubDepartmentSelection(dept)}
                                />
                            </ListItemIcon>
                            <ListItemIcon>
                                <IconButton edge="end" size="small" onClick={() => handleToggle(dept.department)}>
                                    {expandedIds.includes(dept.department) ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    {expandedIds.includes(dept.department) && (
                        <Collapse in={true} timeout="auto" unmountOnExit>
                            {renderSubDepartments(dept.sub_departments, dept)}
                        </Collapse>
                    )}
                </List>
            ))}
        </div>
    );
};

export default DepartmentComponent;
