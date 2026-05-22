import * as React from 'react';
import i18n from '@dhis2/d2-i18n';
import { IconUser24 } from '@dhis2/ui';
import type { ComponentType } from 'react';
import { ViewEventListSection } from '../../Section/ViewEventListSection.component';
import { DisplayMode } from '../../../../WidgetAssignee/DisplayMode.component';
import { EditMode } from '../../../../WidgetAssignee/EditMode.component';
import type { PlainProps } from './AssigneeSection.types';

export const AssigneeSectionComponent: ComponentType<PlainProps> = ({
    assignee,
    readOnly,
    editMode,
    avatarId,
    onEdit,
    onCancelEdit,
    onSet,
}) => (
    <ViewEventListSection
        icon={IconUser24}
        title={i18n.t('Assignee')}
        isEmpty={!editMode && !assignee}
        emptyMessage={i18n.t('No one is assigned to this event')}
        emptyMessageDataTest="widget-assignee-empty-message"
    >
        {editMode ? (
            <EditMode onCancel={onCancelEdit} onSet={onSet} assignee={assignee} />
        ) : (
            <DisplayMode
                assignee={assignee}
                onEdit={onEdit}
                readOnly={readOnly}
                avatarId={avatarId}
            />
        )}
    </ViewEventListSection>
);
