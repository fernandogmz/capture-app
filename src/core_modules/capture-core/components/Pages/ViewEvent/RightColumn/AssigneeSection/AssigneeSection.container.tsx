import React, { useState } from 'react';
import { AssigneeSectionComponent } from './AssigneeSection.component';
import { useUserAvatar, useAssigneeMutation } from '../../../../WidgetAssignee/hooks';
import type { Assignee } from '../../../../WidgetAssignee/WidgetAssignee.types';
import type { Props } from './AssigneeSection.types';

type WithHooksProps = Omit<Props, 'programStage'>;

const AssigneeSectionWithHooks = ({
    assignee,
    readOnly,
    getAssignedUserSaveContext,
    onSaveAssignee,
    onSaveAssigneeError,
}: WithHooksProps) => {
    const [editMode, setEditMode] = useState(false);
    const { avatarId, isLoading } = useUserAvatar(assignee?.id);
    const onSetMutation = useAssigneeMutation({
        assignee,
        getSaveContext: getAssignedUserSaveContext,
        onSave: onSaveAssignee,
        onSaveError: onSaveAssigneeError,
    });

    if (isLoading) return null;

    const handleSet = (user: Assignee | null) => {
        setEditMode(false);
        if (user) onSetMutation(user);
    };

    return (
        <AssigneeSectionComponent
            assignee={assignee}
            readOnly={readOnly}
            editMode={editMode}
            avatarId={avatarId}
            onEdit={() => setEditMode(true)}
            onCancelEdit={() => setEditMode(false)}
            onSet={handleSet}
        />
    );
};

export const AssigneeSection = ({ programStage, ...passOnProps }: Props) => {
    if (!programStage?.enableUserAssignment) return null;
    return <AssigneeSectionWithHooks {...passOnProps} />;
};
