<?php


namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;

class SecurityController extends AbstractController
{

    /**
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        // 1) build the form
        $user = new User();
        $form = $this->createForm(UserType::class, $user);

        // 2) handle the submit (will only happen on POST)
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            // 3) Encode the password (you could also do this via Doctrine listener)
            $password = $passwordEncoder->encodePassword($user, $user->getPlainPassword());
            $user->setPassword($password);

            // 4) save the User!
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            // ... do any other work - like sending them an email, etc
            // maybe set a "flash" success message for the user

            return true;

//            return $this->redirectToRoute('show', [
//                'id' => $user->getId()
//            ]);
        }

        return $this->render(
            'registration/register.html.twig',
            array('form' => $form->createView())
        );
    }

    public function apiRegistration(Request $request, UserPasswordEncoderInterface $passwordEncoder)
    {
        $em = $this->get('doctrine')->getManager();
//        $logger = $this->container->get('logger');

        $password = $request->request->get('password');
        $username = $request->request->get('username');
        $email = $request->request->get('email');

        $user = new User();

        $user->setPassword($passwordEncoder->encodePassword($user, $password));
        $user->setUsername($username);
        $user->setEmail($email);

        $entityManager = $this->getDoctrine()->getManager();
//        $em->persist($user);
//        $em->flush();

        $jwtManager = $this->container->get('lexik_jwt_authentication.jwt_manager');
        /** @var EventDispatcher $dispatcher */
        $dispatcher = $this->get('event_dispatcher');

        $jwt = $jwtManager->create($user);
        $response = new JsonResponse();
        $event = new AuthenticationSuccessEvent(array('token' => $jwt), $user, $request);
        $event->setResponse($response);
        $dispatcher->dispatch(Events::AUTHENTICATION_SUCCESS, $event);
        $response->setData($event->getData());

        return $response;

//        return $this->redirectToRoute('api_login_check', array('username' => $username, 'password' => $password));

//        try {
//            $auth = $this->get('app.auth');
//
//            /** @var User $user */
//            $user = $auth->validateEntites('request', User::class, ['registration']);
//            $password = $request->request->get('_password');
//
//            $user
//                ->setPassword($passwordEncoder->encodePassword($user, $password));
//
//            $em->persist($user);
//            $em->flush();
//
//            return $this->createSuccessResponse($user, ['profile'], true);
//        } catch (ValidatorException $e) {
//            $view = $this->view(['message' => $e->getErrorsMessage()], self::HTTP_STATUS_CODE_BAD_REQUEST);
////            $logger->error($this->getMessagePrefix().'validate error: '.$e->getErrorsMessage());
//        } catch (\Exception $e) {
//            $view = $this->view((array) $e->getMessage(), self::HTTP_STATUS_CODE_BAD_REQUEST);
////            $logger->error($this->getMessagePrefix().'error: '.$e->getMessage());
//        }
//
//        return $this->handleView($view);
    }

    /**
     */
    public function login(AuthenticationUtils $authenticationUtils)
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('login.html.twig', array(
            'last_username' => $lastUsername,
            'error'         => $error,
        ));
    }

}