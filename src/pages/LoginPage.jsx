import {Form} from 'antd';
import {useMutation} from 'react-query';

import {authApi} from '../api/authApi';
import previewPromo from '../assets/images/previewPromo.jpg';
import {useStateContext} from '../contexts';
import {emailRules} from '../utils/regExpRules';
import {ButtonSizes, Colors} from "../const/const";
import {PublicLayout} from "../shared/PublicLayout";
import {PreviewCard} from "../shared/PreviewCard";
import {FormContainer} from "../shared/FormContainer";
import {SpaceContainer} from "../shared/SpaceContainer";
import {Title} from "../shared/Title";
import {FormItem} from "../shared/FormItem";
import {FormInput, FormInputPassword} from "../shared/FormInput";
import {CustomButton} from "../shared/CustomButton";
import {tokenService} from "../services/tokenService";
import {customNotification} from "../utils/customNotification";
import {userService} from "../services/userService";
import {Loader} from "../shared/Loader";

export const LoginPage = () => {
    const [form] = Form.useForm();
    const {dispatch} = useStateContext();

    const {mutate: onAuthMe} = useMutation('authMe', authApi.authMe, {
        onSuccess: (data) => {
            userService.updateUser(data)
            dispatch({type: 'SET_USER_DATA', payload: data})
            // tokenService.updateLocalTokenData(data.refresh_token, 'refresh_token')
            // dispatch({type: 'SET_AUTH_STATUS', payload: true})
        },
    })

    const {mutate: onLogin, isLoading} = useMutation('signIn', authApi.signInUser, {
        onSuccess: (data) => {
            tokenService.updateLocalTokenData(data.token)
            onAuthMe()
            // tokenService.updateLocalTokenData(data.refresh_token, 'refresh_token')
            dispatch({type: 'SET_AUTH_STATUS', payload: true})
        },
    })


    return (
        <PublicLayout>
            <PreviewCard image={previewPromo}/>

            <FormContainer size="small">


                <Title color={Colors.Grey90} size='32px'>
                    Платформа для управления расписаниями
                </Title>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onLogin}
                    style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}
                >

                    <FormItem
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Обязательное поле!',
                            },
                            // {
                            //     message: 'Неверный адрес!',
                            //     pattern: emailRules,
                            // },
                        ]}
                        label="Почта"
                        style={{marginBottom: "20px"}}
                    >
                        <FormInput
                            color={Colors.Grey90}
                            placeholder="Введите почту"
                            type="email"
                            style={{minWidth: "250px"}}
                        />
                    </FormItem>
                    <FormItem
                        name="password"
                        rules={[{required: true, message: 'Обязательное поле!'}]}
                        label="Пароль"
                        style={{marginBottom: "20px"}}
                    >
                        <FormInputPassword
                            color={Colors.Grey90}
                            placeholder="Введите пароль"
                            style={{minWidth: "250px"}}
                        />
                    </FormItem>

                    <FormItem>
                        <CustomButton
                            button_size={ButtonSizes.Large}
                            color={Colors.Blue}
                            htmlType="submit"
                            onClick={form.submit}
                            disabled={isLoading}
                            style={{minWidth: "250px"}}
                        >
                            Войти
                        </CustomButton>
                        {isLoading && <Loader/>}
                    </FormItem>

                </Form>

            </FormContainer>

        </PublicLayout>
    );
};
