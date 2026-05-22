import type { ApiEnrollmentEvent } from 'capture-core-utils/types/api-types';
import type { ProgramStage } from '../../../../../metaData';
import type { UserFormField } from '../../../../FormFields/UserField';
import type { Assignee } from '../../../../WidgetAssignee/WidgetAssignee.types';

export type PlainProps = {
    assignee: UserFormField | null;
    readOnly: boolean;
    editMode: boolean;
    avatarId?: string;
    onEdit: () => void;
    onCancelEdit: () => void;
    onSet: (user: Assignee | null) => void;
};

export type Props = {
    assignee: UserFormField | null;
    programStage?: ProgramStage | null;
    readOnly: boolean;
    getAssignedUserSaveContext: () => { event: ApiEnrollmentEvent };
    onSaveAssignee: (newAssignee: UserFormField) => void;
    onSaveAssigneeError: (prevAssignee: UserFormField | null) => void;
};
