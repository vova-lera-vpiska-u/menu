import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useUnit } from 'effector-react'
import styled from 'styled-components'

import { NutritionFactsTable } from '@pages/admin/NutritionFactsTable'

import { BigButton } from '@widgets/Buttons/BigButton'
import { TextButton } from '@widgets/Buttons/TextButton'
import { FilesInput } from '@widgets/FilesInput'
import { GoBackButton } from '@widgets/GoBackButton'
import { IngredientAddingRow } from '@widgets/IngredientAddingRow'

import { recipesModel } from '@entities/recipe'
import { userModel } from '@entities/user/model'

import { Category } from '@shared/api/types'
import { Clock } from '@shared/icons/Clock'
import { Star } from '@shared/icons/Star'
import { HOMEPAGE_PATH } from '@shared/routes/shared-paths'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_3_LIGHT, TEXT_SIZE_5 } from '@shared/styles/fonts'
import { DropdownMenu } from '@shared/ui/DropdownMenu'
import { FieldBig } from '@shared/ui/FieldBig'
import { FieldSmall } from '@shared/ui/FieldSmall'
import { ToggleButtonSmall } from '@shared/ui/ToggleButtonSmall'

import * as model from './model'
import { adminPageMounted, adminPageUnMounted } from './model'

const timesUnit = ['h', 'min']

export const Admin = () => {
    const [pageMounted, pageUnMounted, sections, sectionOptions] = useUnit([
        adminPageMounted,
        adminPageUnMounted,
        model.$sections,
        model.$sectionOptions,
    ])
    const [categoryList, nutrition] = useUnit([recipesModel.$categories, model.$nutrition])

    const [name, setName] = useState('')
    const [section, setSection] = useState('fire')
    const [chosenCategories, setChosenCategories] = useState<Category[]>([])
    const [rating, setRating] = useState(0)
    const [timeAmount, setTimeAmount] = useState('')
    const [timeType, setTimeType] = useState('h')
    const [image, setImage] = useState<File | null>(null)

    useEffect(() => {
        pageMounted()
        return () => pageUnMounted()
    }, [])

    const [createRecipeClicked] = useUnit([model.createRecipeClicked])

    return (
        <div>
            <Header />
            <Layout
                onSubmit={(e) => {
                    e.preventDefault()
                    const selectedSection = sections?.find((s) => s.name === section)?._id
                    if (!image || !selectedSection) return
                    createRecipeClicked({
                        name,
                        categories: chosenCategories.map((category) => category._id),
                        section: selectedSection,
                        rating,
                        timeToCook: `${timeAmount}${timeType}`,
                        image,
                        nutrition,
                    })
                }}
            >
                <SettingLayout columnStart={1} columnEnd={3}>
                    <Name>Name</Name>
                    <FieldBig
                        name="Name"
                        placeholder="Name"
                        type=""
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    ></FieldBig>
                </SettingLayout>

                <SettingLayout columnStart={1} columnEnd={2}>
                    <Name>Category</Name>
                    <DropdownMenu
                        optionsArray={sectionOptions}
                        value={section}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSection(e.target.value)}
                    ></DropdownMenu>
                </SettingLayout>

                <SettingLayout columnStart={1} columnEnd={3}>
                    <Name>Tags</Name>
                    <TagsWrapper>
                        {categoryList?.map((category) => {
                            return (
                                <ToggleButtonSmall<Category>
                                    key={category._id}
                                    label={category}
                                    labels={chosenCategories}
                                    setLabels={(labels) => {
                                        setChosenCategories(labels)
                                    }}
                                />
                            )
                        })}
                    </TagsWrapper>
                </SettingLayout>

                <SettingLayout columnStart={1} columnEnd={2}>
                    <Name>Rate</Name>
                    <RateWrapper>
                        <FieldSmall
                            placeholder=""
                            type="text"
                            name=""
                            iconVisible={false}
                            value={rating}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRating(Number(e.target.value))}
                        ></FieldSmall>
                        <Star height="24" width="24" />
                    </RateWrapper>
                </SettingLayout>

                <SettingLayout columnStart={1} columnEnd={2}>
                    <Name>Time</Name>
                    <TimeWrapper>
                        <FieldSmall
                            placeholder=""
                            type="search"
                            name=""
                            iconVisible={false}
                            value={timeAmount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeAmount(e.target.value)}
                        ></FieldSmall>
                        <DropdownMenu
                            optionsArray={timesUnit}
                            value={timeType}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimeType(e.target.value)}
                        ></DropdownMenu>
                        <Clock height="24" width="24" />
                    </TimeWrapper>
                </SettingLayout>

                {/* <SettingLayout columnStart={1} columnEnd={3}>
                    <Name>Ingredients</Name>
                    <IngredientAddingRow labelColor={COLORS.oliveGreen}></IngredientAddingRow>
                </SettingLayout>

                <SettingLayout columnStart={1} columnEnd={3}>
                    <Name>Recipe</Name>
                    <RecipeStepWrapper>
                        1 <FieldSmall iconVisible={false} name="" type="text"></FieldSmall>
                    </RecipeStepWrapper>
                </SettingLayout> */}

                <SettingLayout columnStart={1} columnEnd={3}>
                    <Name>
                        Nutrition Facts <NutritionMark>(per 100g)</NutritionMark>
                    </Name>
                    <NutritionFactsTable></NutritionFactsTable>
                </SettingLayout>

                <SettingLayout columnStart={1} columnEnd={3}>
                    <Name>Upload image</Name>
                    <FilesInput
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setImage(e.target.files ? e.target.files[0] : null)
                        }
                    />
                </SettingLayout>
                <SettingLayout columnStart={1} columnEnd={2}>
                    <TextButton>Delete recipe</TextButton>
                </SettingLayout>
                <SettingLayout columnStart={2} columnEnd={3}>
                    <BigButton>Save</BigButton>
                </SettingLayout>
            </Layout>
        </div>
    )
}

const Header = () => {
    const navigate = useNavigate()
    const { title } = useParams<{ title: string }>()
    const [logout] = useUnit([userModel.events.logout])

    return (
        <>
            <Button
                onClick={() => {
                    logout()
                    navigate(HOMEPAGE_PATH, { replace: true })
                }}
            >
                Logout
            </Button>
            <Nav>
                <GoBackButton to={`/${title}`} />
                <Title>{title}</Title>
            </Nav>
        </>
    )
}

const Nav = styled.div`
    height: calc(26px + 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.h2`
    font-family: 'Enthalpy 298';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: #ffffff;
`

const NutritionMark = styled.span`
    position: relative;
    ${TEXT_SIZE_5}
    color: ${COLORS.lightGray};
`

const RecipeStepWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 6px;
    width: 100%;

    ${TEXT_SIZE_3_LIGHT}
    color: ${COLORS.white};
`
const TimeWrapper = styled.div`
    display: grid;

    grid-template-columns: 42% 36% 13%;
    column-gap: 10px;
    row-gap: 32px;

    align-items: center;
    padding: 0px;
    gap: 8px;

    width: 100%;

    flex-grow: 0;
    min-height: 0; /* NEW */
    min-width: 0;
`
const RateWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 4px;

    width: 100%;

    flex: none;
    order: 1;
    flex-grow: 0;
`
const TagsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    padding: 0px;
    gap: 4px;

    width: 100%;

    flex: none;
    order: 1;
    flex-grow: 0;
`
const Layout = styled.form`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    justify-content: flex-start;
    row-gap: 32px;

    min-height: 0; /* NEW */
    min-width: 0;
`
const Button = styled.button`
    position: absolute;
    top: 16px;
    right: 32px;
`
const SettingLayout = styled.div<{ columnStart: number; columnEnd: number }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
    grid-column: ${({ columnStart }) => columnStart} / ${({ columnEnd }) => columnEnd};
    gap: 8px;

    min-width: 0;
`
const Name = styled.div`
    color: ${COLORS.white} ${TEXT_SIZE_3_LIGHT};
`
