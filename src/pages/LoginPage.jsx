// eslint-disable-next-line prettier/prettier
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

export const LoginPage = () => {
  const [form] = Form.useForm();
  const { dispatch } = useStateContext();

  const { mutate: onLogin, isLoading } = useMutation('signIn', authApi.signInUser, {
    onSuccess: (data) => {
      // tokenService.updateLocalTokenData(data.access_token, 'access_token')
      // tokenService.updateLocalTokenData(data.refresh_token, 'refresh_token')
      dispatch({ type: 'SET_AUTH_STATUS', payload: true })
    },
  })


  return (
    <PublicLayout>
      <PreviewCard image={previewPromo} />

      <FormContainer size="small">

       <SpaceContainer size="small">

         <Title color={Colors.Grey90} size='32px'>
           Платформа для управления расписаниями
         </Title>

         <SpaceContainer />

         <Form
             form={form}
             layout="vertical"
             onFinish={onLogin}
         >
             <SpaceContainer align="baseline" size="large" direction="vertical">
                 <FormItem
                     name="user_id"
                     rules={[
                       {
                         required: true,
                         message: 'Обязательное поле!',
                       },
                       {
                         message: 'Неверный адрес!',
                         pattern: emailRules,
                       },
                     ]}
                     label="Почта"
                 >
                   <FormInput
                       color={Colors.Grey90}
                       placeholder="Введите почту"
                       type="email"
                   />
                 </FormItem>
                 <FormItem
                     name="password"
                     rules={[{ required: true, message: 'Обязательное поле!' }]}
                     label="Пароль"
                 >
                   <FormInputPassword
                       color={Colors.Grey90}
                       placeholder="Введите пароль"
                   />
                 </FormItem>
              </SpaceContainer>
            <SpaceContainer>
             <FormItem wrapperCol={{ offset: 7 }}>
               <CustomButton
                   button_size={ButtonSizes.Large}
                   color={Colors.Blue}
                   htmlType="submit"
                   onClick={form.submit}
                   disabled={isLoading}
               >
                 Войти
               </CustomButton>
             </FormItem>

           </SpaceContainer>

         </Form>
       </SpaceContainer>

      </FormContainer>

    </PublicLayout>
  );
};
