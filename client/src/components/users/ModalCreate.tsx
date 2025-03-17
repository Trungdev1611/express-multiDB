import React, { useEffect } from 'react'
import MyModal from '../common/Modal'
import ErrorTextItemForm from '../common/ErrorTextItemForm'
import { ParamsCreateNewUser, UserType } from '@/util/api/user/type';
import { schemaCreateUser } from '@/util/api/user/Schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import FormFieldSelect from '../common/FormFieldSelect';
import TextFieldForm from '../common/TextFieldForm';
import { useQuery } from '@tanstack/react-query';
import departmentAPI from '@/util/api/department/Department';
import roleAPI from '@/util/api/roles/Roles';
import BoxLoading from '../common/Loading';

interface ModalCreateProps {
    openCreate: boolean
    handleClose: () => void
    onSubmitModal: (value: ParamsCreateNewUser, reset: () => void) => void,
    itemEdit: null | UserType
}

const ModalCreate = ({ openCreate, handleClose, onSubmitModal, itemEdit }: ModalCreateProps) => {
    const { control, handleSubmit, formState: { errors } , reset} = useForm<ParamsCreateNewUser>({
        resolver: yupResolver(schemaCreateUser),
        defaultValues: {
            username: undefined,
            email: undefined,
            department_id: "",
            role_id: "",
            password: undefined
          },
    });

    useEffect(() => {
        if(itemEdit) {
            reset({
                username: itemEdit.username,
                department_id: String(itemEdit.department_id),
                email: itemEdit.email,
                password: itemEdit.password,
                role_id: String(itemEdit.role_id)
            })
        }
    }, [itemEdit, reset])
    const { data, isLoading } = useQuery({
        queryKey: ["listFilters"], // Same key as in Filter
        queryFn: async () => {
            const [department, roles] = await Promise.all([
                departmentAPI.getDepartmentList(),
                roleAPI.roleList(),
            ]);
            return { department, roles };
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        gcTime: 1000 * 60 * 5
    });

    function handleCloseModal() {
        handleClose()
        reset();
    }
    return (
        <MyModal
            open={openCreate}
            closeModal={handleCloseModal}
            onOk={handleSubmit((data) => onSubmitModal(data, reset))}
            title={`Create new users`}
        >
            <BoxLoading loading={isLoading}>
                <form>
                    <div className='flex flex-col gap-y-3'>
                        <div>
                            <Controller
                                name="username"
                                control={control}
                                defaultValue={""}
                                render={({ field }) => (
                                    <TextFieldForm  {...field}
                                        label='Username'
                                        required
                                        layout='vertical'
                                    />
                                )}
                            />
                            <ErrorTextItemForm message={errors.username?.message} />
                        </div>

                        <div>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <TextFieldForm {...field}
                                    label='Password'
                                    required
                                    layout='vertical'
                                />}
                            />
                            <ErrorTextItemForm message={errors.password?.message} />
                        </div>

                        <div>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <TextFieldForm {...field}
                                    label='Email'
                                    required
                                    layout='vertical'
                                />}
                            />
                            <ErrorTextItemForm message={errors.email?.message} />
                        </div>

                        <div>
                            <Controller
                                name="department_id"
                                control={control}
                                defaultValue={""}

                                render={({ field }) => (
                                    <FormFieldSelect options={data?.department || []} {...field}
                                        label="Department"
                                        layout="vertical"
                                        placeholder="Choose a department" required />
                                )}
                            />
                            <ErrorTextItemForm message={errors.department_id?.message} />

                        </div>

                        <div>
                            <Controller
                                name="role_id"
                                control={control}
                                defaultValue={""}
                                render={({ field }) => (
                                    <FormFieldSelect options={data?.roles || []} {...field}
                                        layout="vertical"
                                        label='Roles'
                                        required
                                        placeholder="Choose a role" />
                                )}
                            />
                            <ErrorTextItemForm message={errors.role_id?.message} />

                        </div>

                    </div>
                </form>
            </BoxLoading>



        </MyModal>
    )
}

export default ModalCreate