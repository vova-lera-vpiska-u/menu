import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useGate, useUnit } from 'effector-react'
import styled from 'styled-components'

import { BigButton } from '@widgets/Buttons/BigButton'
import { TextButton } from '@widgets/Buttons/TextButton'
import { FilesInput } from '@widgets/FilesInput'

import { recipesModel } from '@entities/recipe'

import { Category, Recipe, Tag } from '@shared/api/recipes'
import { Clock } from '@shared/icons/Clock'
import { Star } from '@shared/icons/Star'
import { HOMEPAGE_PATH, RECIPE_PATH } from '@shared/routes/shared-paths'
import { COLORS } from '@shared/styles/colors'
import { TEXT_SIZE_3_LIGHT, TEXT_SIZE_5 } from '@shared/styles/fonts'
import { DropdownMenu } from '@shared/ui/DropdownMenu'
import { FieldBig } from '@shared/ui/FieldBig'
import { FieldSmall } from '@shared/ui/FieldSmall'
import { ToggleButtonSmall } from '@shared/ui/ToggleButtonSmall'

import { NutritionFactsTable } from './NutritionFactsTable'
import * as model from './model'
import { Nutrition } from './model'

const TIME_UNITS = ['h', 'min']

const EMPTY_NUTRITION: Nutrition = { calories: '', protein: '', fat: '', carbs: '' }

type RecipeFormValues = {
    setName: (name: string) => void
    setSection: (section: string) => void
    setRating: (rating: number) => void
    setTimeAmount: (amount: string) => void
    setTimeType: (unit: string) => void
    setChosenCategories: (categories: Tag[]) => void
    setNutrition: (nutrition: Nutrition) => void
}

// Prefill the form fields once the edited recipe (and tag list) have loaded.
const usePrefillFromRecipe = (
    recipe: Recipe | null | undefined,
    categoryList: Tag[] | null,
    setters: RecipeFormValues,
) => {
    const { setName, setSection, setRating, setTimeAmount, setTimeType, setChosenCategories, setNutrition } = setters

    useEffect(() => {
        if (!recipe) return
        setName(recipe.name)
        setSection(recipe.category.name)
        setRating(recipe.rating ?? 0)
        if (recipe.time_to_cook !== null) {
            setTimeAmount(String(recipe.time_to_cook))
            setTimeType('min')
        }
        setNutrition({
            calories: numberToField(recipe.calories),
            protein: numberToField(recipe.protein),
            fat: numberToField(recipe.fat),
            carbs: numberToField(recipe.carbs),
        })
        if (categoryList) {
            setChosenCategories(categoryList.filter((category) => recipe.tags.some((tag) => tag.tag?.id === category.id)))
        }
    }, [
        recipe,
        categoryList,
        setName,
        setSection,
        setRating,
        setTimeAmount,
        setTimeType,
        setChosenCategories,
        setNutrition,
    ])
}

// Navigate away after a successful update (to the recipe) or delete (to home).
// The counters are global stores, so compare against a per-mount baseline to
// avoid navigating on mount just because a previous edit already succeeded.
const useNavigateOnSuccess = (recipeId: string | undefined) => {
    const navigate = useNavigate()
    const [updateDone, deleteDone] = useUnit([model.$updateDoneCount, model.$deleteDoneCount])
    const baselineUpdate = useRef(updateDone)
    const baselineDelete = useRef(deleteDone)

    useEffect(() => {
        if (updateDone > baselineUpdate.current && recipeId) {
            baselineUpdate.current = updateDone
            navigate(RECIPE_PATH.replace(':id', recipeId))
        }
    }, [updateDone, recipeId, navigate])

    useEffect(() => {
        if (deleteDone > baselineDelete.current) {
            baselineDelete.current = deleteDone
            navigate(HOMEPAGE_PATH)
        }
    }, [deleteDone, navigate])
}

type RecipeFormProps = {
    mode: 'create' | 'edit'
    recipe?: Recipe | null
}

export const RecipeForm = ({ mode, recipe }: RecipeFormProps) => {
    useGate(model.RecipeFormGate)

    const [sections, sectionOptions] = useUnit([model.$sections, model.$sectionOptions])
    const [categoryList, formError] = useUnit([recipesModel.$categories, model.$formError])
    const [createRecipeClicked, updateRecipeClicked, deleteRecipeClicked] = useUnit([
        model.createRecipeClicked,
        model.updateRecipeClicked,
        model.deleteRecipeClicked,
    ])
    const [creating, updating, deleting] = useUnit([
        model.createRecipeFx.pending,
        model.updateRecipeFx.pending,
        model.deleteRecipeFx.pending,
    ])

    const [name, setName] = useState('')
    const [section, setSection] = useState('fire')
    const [chosenCategories, setChosenCategories] = useState<Tag[]>([])
    const [rating, setRating] = useState(0)
    const [timeAmount, setTimeAmount] = useState('')
    const [timeType, setTimeType] = useState('h')
    const [image, setImage] = useState<File | null>(null)
    const [nutrition, setNutrition] = useState<Nutrition>(EMPTY_NUTRITION)
    const [validationError, setValidationError] = useState<string | null>(null)

    usePrefillFromRecipe(mode === 'edit' ? recipe : null, categoryList, {
        setName,
        setSection,
        setRating,
        setTimeAmount,
        setTimeType,
        setChosenCategories,
        setNutrition,
    })
    useNavigateOnSuccess(recipe?.id)

    const saving = creating || updating

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const selectedSection: Category | undefined = sections?.find((currentSection) => currentSection.name === section)
        if (!name.trim()) return setValidationError('Enter a name')
        if (!selectedSection) return setValidationError('Pick a category')

        if (mode === 'edit') {
            if (!recipe) return
            setValidationError(null)
            updateRecipeClicked({
                id: recipe.id,
                name,
                categoryId: selectedSection.id,
                categories: chosenCategories.map((category) => category.id),
                rating: rating || null,
                timeToCook: toMinutes(timeAmount, timeType),
                nutrition,
            })
            return
        }

        if (!image) return setValidationError('Upload an image')
        setValidationError(null)
        createRecipeClicked({
            name,
            categories: chosenCategories.map((category) => category.id),
            section: selectedSection.id,
            rating,
            timeToCook: `${timeAmount}${timeType}`,
            image,
            nutrition,
        })
    }

    const handleDelete = () => {
        if (!recipe) return
        if (window.confirm('Delete this recipe? This action cannot be undone.')) deleteRecipeClicked(recipe.id)
    }

    return (
        <Layout onSubmit={handleSubmit}>
            <SettingLayout columnStart={1} columnEnd={3}>
                <Name>Name</Name>
                <FieldBig
                    name="Name"
                    placeholder="Name"
                    type=""
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                />
            </SettingLayout>

            <SettingLayout columnStart={1} columnEnd={2}>
                <Name>Category</Name>
                <DropdownMenu
                    optionsArray={sectionOptions}
                    value={section}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSection(event.target.value)}
                />
            </SettingLayout>

            <SettingLayout columnStart={1} columnEnd={3}>
                <Name>Tags</Name>
                <TagsWrapper>
                    {categoryList?.map((category) => (
                        <ToggleButtonSmall<Tag>
                            key={category.id}
                            label={category}
                            labels={chosenCategories}
                            setLabels={(labels) => setChosenCategories(labels)}
                        />
                    ))}
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
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRating(Number(event.target.value))}
                    />
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
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTimeAmount(event.target.value)}
                    />
                    <DropdownMenu
                        optionsArray={TIME_UNITS}
                        value={timeType}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setTimeType(event.target.value)}
                    />
                    <Clock height="24" width="24" />
                </TimeWrapper>
            </SettingLayout>

            <SettingLayout columnStart={1} columnEnd={3}>
                <Name>
                    Nutrition Facts <NutritionMark>(per 100g)</NutritionMark>
                </Name>
                <NutritionFactsTable value={nutrition} onChange={setNutrition} />
            </SettingLayout>

            {mode === 'create' && (
                <SettingLayout columnStart={1} columnEnd={3}>
                    <Name>Upload image</Name>
                    <FilesInput
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setImage(event.target.files ? event.target.files[0] : null)
                        }
                    />
                </SettingLayout>
            )}

            {(validationError || formError) && (
                <SettingLayout columnStart={1} columnEnd={3}>
                    <ErrorMessage>{validationError || formError}</ErrorMessage>
                </SettingLayout>
            )}

            {mode === 'edit' && (
                <SettingLayout columnStart={1} columnEnd={2}>
                    <TextButton onClick={handleDelete} disabled={deleting}>
                        {deleting ? 'Deleting…' : 'Delete recipe'}
                    </TextButton>
                </SettingLayout>
            )}
            <SettingLayout columnStart={mode === 'edit' ? 2 : 1} columnEnd={3}>
                <BigButton disabled={saving}>{saving ? 'Saving…' : 'Save'}</BigButton>
            </SettingLayout>
        </Layout>
    )
}

// Render a nullable numeric column as an editable field string.
function numberToField(value: number | null): string {
    return value === null ? '' : String(value)
}

// Convert the amount + unit pair into a plain minute count for the API.
function toMinutes(amount: string, unit: string): number | null {
    if (!amount.trim()) return null
    const parsed = Number(amount)
    if (!Number.isFinite(parsed)) return null
    return unit === 'h' ? parsed * 60 : parsed
}

const ErrorMessage = styled.div`
    ${TEXT_SIZE_5}
    color: ${COLORS.danger};
`

const NutritionMark = styled.span`
    position: relative;
    ${TEXT_SIZE_5}
    color: ${COLORS.lightGray};
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
    min-height: 0;
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

    min-height: 0;
    min-width: 0;
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
