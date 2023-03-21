import { Heading, ListItem, Text, UnorderedList, VStack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"

const PrivacyPolicy = () => {
    return (
        <VStack minH='calc(100vh - 101px)' bgColor='gray.100' p={4}>
            <Helmet>
                <title>Políticas de privacidad</title>
            </Helmet>
            <Heading as={motion.h1} viewport={{ once: true }}
                initial={{
                    y: -10,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                        duration: 1.05
                    }
                }} textAlign='center' my={[4, 8]}>Políticas de privacidad</Heading>
            <VStack maxWidth='3xl'>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 1.05
                        }
                    }}
                    my={4}
                >
                    Xochilcalli, mejor conocido como casa de las flores con domicilio 1er. Cerrada de la Obsidiana no.809 Mineral de la reforma, CP 42186, Hidalgo es responsable del uso, tratamiento y protección de aquellos datos personales a que tuviere acceso para brindarle algún servicio y/o la venta de productos (de ahora en adelante y de forma conjunta "datos personales"), los cuales serán tratados de forma confidencial de conformidad con lo señalado en este Aviso de Privacidad y bajo los principios señalados en la Ley Federal de Datos Personales en Posesión de los Particulares ("LFPDPPPP"), su Reglamento, lineamientos y disposiciones secundarias.
                </Text>
                <Heading as={motion.h3} viewport={{ once: true }}
                    initial={{
                        x: -10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                    textAlign='center'
                >Uso y fin de la información</Heading>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                    py={4}
                >
                    La Empresa se compromete a no compartir la información confidencial proporcionada por el usuario, con ningún tercero, excepto que tenga autorización de éste, pues es quien acepta el tratamiento de los mismos y autoriza su uso cuando los proporciona, a través de los diferentes medios de conformidad con los términos de esta política.


                </Text>
                <Text as={motion.p} viewport={{ once: true }}
                    initial={{
                        y: 10,
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                    py={2}
                >
                    Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades, mismas que son necesarias para brindarle algún servicio o la venta de productos:
                </Text>
                <UnorderedList as={motion.ul} viewport={{ once: true }}
                    initial={{
                        x: -10,
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                    px={8}
                >
                    <ListItem py={1.5}>Compraventa de productos y/o prestación de servicios.</ListItem>
                    <ListItem py={1.5}>Envío de publicidad bajo cualquier medio de comunicación.</ListItem>
                    <ListItem py={1.5}>Implementación de mejoras en productos y servicios.</ListItem>
                    <ListItem py={1.5}>Procesos administrativos como devoluciones, facturaciones, históricos de compras, procesamiento de solicitudes, cobro, aclaraciones, investigación, órdenes de compra.</ListItem>
                    <ListItem py={1.5}>Comunicar ofertas y promociones direccionadas.</ListItem>
                    <ListItem py={1.5}>Invitaciones a eventos especiales y sorteos en redes sociales.</ListItem>
                    <ListItem py={1.5}>Atención al cliente.</ListItem>
                </UnorderedList>
                <Heading as={motion.h3} viewport={{ once: true }}
                    initial={{
                        x: -10,
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                    textAlign='center'
                    py={4}
                >Datos personales que podemos obtener</Heading>
                <UnorderedList as={motion.ul} viewport={{ once: true }}
                    initial={{
                        x: -10,
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 1.25,
                        },
                    }}
                    px={8}
                >
                    <ListItem py={1.5}>Datos Generales (Nombre completo, Edad, Fecha de Nacimiento, Sexo, RFC).</ListItem>
                    <ListItem py={1.5}>Datos de Domicilio (CP, Estado, Ciudad, Municipio, Colonia, Calle, Número exterior).</ListItem>
                    <ListItem py={1.5}>Datos de contacto(Correo electrónico, Teléfono).</ListItem>
                    <ListItem py={1.5}>Datos financieros: (Número de Tarjeta bancaria, Vigencia, CVC).</ListItem>
                </UnorderedList>
            </VStack>
        </VStack>
    )
}
export default PrivacyPolicy