import { createElement } from 'react'

import * as FeatherIcons from 'feather-icons-react'
import styled from 'styled-components'

import { getAssetUrl } from '@shared/lib/asset-url'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_1, TEXT_SIZE_4, TEXT_SIZE_5 } from '@shared/styles/fonts'
import {
    Alert,
    BrandLogo,
    Button,
    ButtonIcon,
    ButtonText,
    CategoryCard,
    Checkbox,
    Chip,
    DishCard,
    Dropdown,
    Field,
    Header,
    Popup,
    RangeInput,
    Scrollbar,
    SearchField,
    Slider,
    Sugar,
    Tag,
    WineColor,
    WineGlass,
} from '@shared/ui/kit'

import { Section } from './ui'

const { default: DynamicFeatherIcon, ...namedIcons } = FeatherIcons
const iconEntries = Object.entries(namedIcons)

const categories = ['Fire', 'Earth', 'Air', '5-Element', 'Ethanol', 'HLS']
const ingredients = ['Potato', 'Eggs', 'Onion', 'Salt', 'Olive oil']

const fireImage = getAssetUrl('fire.webp')
const earthImage = getAssetUrl('earth.webp')
const airImage = getAssetUrl('air.webp')

export const UiKit = () => {
    return (
        <Page>
            <PageTitle>UI Kit</PageTitle>

            <Section title="Buttons, tags">
                <Grid>
                    <Column>
                        <ColumnTitle>Fill</ColumnTitle>
                        <Button forcedState="default">AUF</Button>
                        <Button forcedState="hover">AUF</Button>
                        <Button forcedState="active">AUF</Button>
                        <Button forcedState="disable">AUF</Button>
                        <Button forcedState="focus">AUF</Button>
                    </Column>
                    <Column>
                        <ColumnTitle>Outline</ColumnTitle>
                        <Button variant="outline" forcedState="default">
                            AUF
                        </Button>
                        <Button variant="outline" forcedState="hover">
                            AUF
                        </Button>
                        <Button variant="outline" forcedState="active">
                            AUF
                        </Button>
                        <Button variant="outline" forcedState="disable">
                            AUF
                        </Button>
                        <Button variant="outline" forcedState="focus">
                            AUF
                        </Button>
                    </Column>
                    <Column>
                        <ColumnTitle>Text</ColumnTitle>
                        <ButtonText forcedState="default">AUF</ButtonText>
                        <ButtonText forcedState="hover">AUF</ButtonText>
                        <ButtonText forcedState="active">AUF</ButtonText>
                        <ButtonText forcedState="disable">AUF</ButtonText>
                        <ButtonText forcedState="focus">AUF</ButtonText>
                    </Column>
                    <Column>
                        <ColumnTitle>Icon</ColumnTitle>
                        <Row>
                            <ButtonIcon aria-label="search">
                                <FeatherIcons.Search size={26} />
                            </ButtonIcon>
                            <ButtonIcon aria-label="edit">
                                <FeatherIcons.Edit2 size={26} />
                            </ButtonIcon>
                            <ButtonIcon aria-label="trash">
                                <FeatherIcons.Trash2 size={26} />
                            </ButtonIcon>
                            <ButtonIcon forcedState="disable" aria-label="plus">
                                <FeatherIcons.Plus size={26} />
                            </ButtonIcon>
                        </Row>
                    </Column>
                </Grid>

                <SubTitle>Chips & tag</SubTitle>
                <Row>
                    <Chip size="big">pizza</Chip>
                    <Chip size="big" forcedState="active">
                        pizza
                    </Chip>
                    <Chip size="big" forcedState="focus">
                        pizza
                    </Chip>
                </Row>
                <Row>
                    <Chip size="small">pizza</Chip>
                    <Chip size="small" leftIcon={<span>🇮🇹</span>}>
                        italy
                    </Chip>
                    <Chip size="small" colorDot={COLORS.wineRed}>
                        isabella
                    </Chip>
                    <Chip size="category">#Potato</Chip>
                    <Chip size="category" forcedState="active">
                        #Potato
                    </Chip>
                    <Chip size="category" forcedState="focus">
                        #Potato
                    </Chip>
                </Row>
                <Row>
                    <Tag>punch</Tag>
                    <Tag forcedState="active">punch</Tag>
                    <Tag forcedState="focus">punch</Tag>
                </Row>

                <SubTitle>Wine colors</SubTitle>
                <Row>
                    <WineColor kind="white" />
                    <WineColor kind="red" selected />
                    <WineColor kind="pink" />
                    <WineColor kind="orange" />
                    <WineColor kind="sparkling" />
                </Row>

                <SubTitle>Wine technology & sugar</SubTitle>
                <Row>
                    <WineGlass technology="classic" />
                    <WineGlass technology="fortified" />
                    <WineGlass technology="sparkling" active />
                    <Sugar level={2} />
                </Row>
            </Section>

            <Section title="Fields, inputs, forms">
                <Grid>
                    <Column>
                        <ColumnTitle>Field / Big</ColumnTitle>
                        <Field placeholder="Who?" />
                        <Field forcedState="hover" placeholder="Who?" />
                        <Field forcedState="active" defaultValue="administrator" />
                        <Field forcedState="completed" defaultValue="administrator" />
                        <Field
                            forcedState="error"
                            defaultValue="administrator"
                            errorMessage="we don't know such people"
                        />
                        <Field forcedState="disable" placeholder="Who?" />
                        <Field forcedState="focus" placeholder="Who?" />
                    </Column>
                    <Column>
                        <ColumnTitle>Field / Small</ColumnTitle>
                        <Field size="small" placeholder="Enter full name" />
                        <Field size="small" forcedState="hover" placeholder="Enter full name" />
                        <Field size="small" forcedState="active" defaultValue="Enter full name" />
                        <Field size="small" forcedState="completed" defaultValue="Enter full name" />
                        <Field
                            size="small"
                            forcedState="error"
                            defaultValue="Enter full name"
                            errorMessage="This recipe is already available"
                        />
                        <Field size="small" forcedState="disable" placeholder="Enter full name" />
                        <Field size="small" forcedState="focus" placeholder="Enter full name" />
                    </Column>
                    <Column>
                        <ColumnTitle>Dropdown</ColumnTitle>
                        <Dropdown placeholder="Who?" />
                        <Dropdown forcedState="hover" placeholder="Who?" />
                        <Dropdown open options={categories} value="Fire" />
                        <Dropdown forcedState="completed" value="Fire" />
                        <Dropdown forcedState="disabled" placeholder="Who?" />
                    </Column>
                    <Column>
                        <ColumnTitle>Checkbox</ColumnTitle>
                        <Checkbox label="optional" />
                        <Checkbox label="optional" defaultChecked />
                    </Column>
                </Grid>
            </Section>

            <Section title="Recipe info">
                <Row>
                    <DishCard
                        variant="short"
                        title="Cutlet with mashed potatoes"
                        image={fireImage}
                        time="4-6 min"
                        rating={4.8}
                    />
                    <DishCard
                        variant="full"
                        title="Cutlet with mashed potatoes"
                        image={earthImage}
                        time="4-6 min"
                        rating={4.8}
                        ingredients={ingredients}
                    />
                    <DishCard variant="wishlist" title="Cutlet with mashed potatoes" image={airImage} />
                </Row>
                <SubTitle>Category cards</SubTitle>
                <Row>
                    <CategoryCard variant="wide" title="Desserts" image={earthImage} />
                    <CategoryCard variant="small" title="Fire" image={fireImage} />
                </Row>
            </Section>

            <Section title="Interface">
                <Row>
                    <Alert message="Item was deleted" actionLabel="Return" />
                </Row>
                <Row>
                    <Popup variant="success" title="Title" secondaryLabel="Add another" primaryLabel="Good" />
                    <Popup variant="danger" title="Title" secondaryLabel="Cancel" primaryLabel="Logout" />
                </Row>
                <SubTitle>Logo & header</SubTitle>
                <Row>
                    <BrandLogo />
                    <BrandLogo admin />
                </Row>
                <Column style={{ maxWidth: 408 }}>
                    <Header variant="wide" />
                    <Header variant="slim" />
                </Column>
                <SubTitle>Search</SubTitle>
                <Row>
                    <SearchField open={false} />
                    <SearchField open />
                </Row>
                <SubTitle>Scrollbar, slider, range</SubTitle>
                <Column style={{ maxWidth: 408, gap: 16 }}>
                    <Scrollbar value={35} />
                    <Slider count={5} active={0} />
                    <RangeInput valueStart={3} valueEnd={5} />
                </Column>
            </Section>

            <Section title="Icons">
                <DynamicNote>
                    Rendered straight from <code>feather-icons-react</code> — dynamic example:{' '}
                    <DynamicFeatherIcon icon="coffee" size={18} color={COLORS.oliveGreen} />
                </DynamicNote>
                <IconGrid>
                    {iconEntries.map(([name, IconComponent]) => (
                        <IconCell key={name} title={name}>
                            {createElement(IconComponent, { size: 24, color: COLORS.lightGray })}
                        </IconCell>
                    ))}
                </IconGrid>
            </Section>
        </Page>
    )
}

const Page = styled.div`
    min-height: 100vh;
    padding: 40px;
    box-sizing: border-box;
    background-color: ${COLORS.backgroundColor};
    color: ${COLORS.white};
    display: flex;
    flex-direction: column;
    gap: 56px;
`

const PageTitle = styled.h1`
    margin: 0;
    color: ${COLORS.white};
    ${TEXT_SIZE_1};
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 32px;
    align-items: start;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
`

const ColumnTitle = styled.h3`
    margin: 0 0 4px;
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_4};
`

const SubTitle = styled.h3`
    margin: 24px 0 4px;
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_4};
`

const DynamicNote = styled.p`
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 0 16px;
    color: ${COLORS.lightGray};
    ${TEXT_SIZE_5};
`

const IconGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
    gap: 4px;
`

const IconCell = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    border-radius: 4px;
    color: ${COLORS.lightGray};
    transition: background-color 0.15s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.06);
    }
`
