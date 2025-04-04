import React from "react";
import axios from "axios";
import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default class InspectorControlsStudentProjects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sections: [],
			apiSource: "",
			zenFetchMode: "",
		};
	}

	componentDidUpdate(prevProps, prevState) {
		// Check if apiSource has changed
		if (
			prevState.apiSource !== this.state.apiSource &&
			this.state.apiSource !== ""
		) {
			this.fetchData(this.state.apiSource);
		}
	}
	fetchData(source) {
		const basePath =
			"wp-content/plugins/wp-gutenberg-epfl/frontend/epfl-student-projects/get-sections";
		const entryPointProjects =
			(source === "isa") || (source === "zen")
				? window.location.href.replace(
						/wp-admin\/.*/,
						`${basePath}-${source}.php`,
				  )
				: null;
		if (entryPointProjects === null && source !== "zen") {
			return;
		}

		if (source === "zen") {
			if (this.state.zenFetchMode === "sciper" && this.props.attributes.professorScipers) {
				const sciper = this.props.attributes.professorScipers;
				const zenApiUrl = `https://test-sti-zen.epfl.ch/api/public/projects/manager/${sciper}`;
				axios
					.get(zenApiUrl)
					.then((response) => {
						return response.data;
					})
					.then((data) => {
						if (!Array.isArray(data)) {
							throw new TypeError("Expected an array but got " + typeof data);
						}

						const filteredAndMappedSections = data.map((project) => ({
							label: project.title,
							value: project.id,
						}));

						this.setState({
							sections: filteredAndMappedSections,
						});

						// Update the block's attributes with the fetched data
						this.props.setAttributes({ section: filteredAndMappedSections });
					})
					.catch((error) => {
						console.error("Error fetching data from ZEN API:", error);
						this.setState({ sections: [] });
					});
			} else if (this.state.zenFetchMode === "section" || this.state.zenFetchMode === "") {
				axios
					.get(entryPointProjects)
					.then((response) => {
						return response.data;
					})
					.then((data) => {
						if (!Array.isArray(data)) {
							throw new TypeError("Expected an array but got " + typeof data);
						}

						const filteredAndMappedSections = data.map((section) => ({
							label: section.acronym,
							value: section.acronym,
						}));

						this.setState({
							sections: filteredAndMappedSections,
						});

						// Update the block's attributes with the fetched data
						this.props.setAttributes({ section: filteredAndMappedSections });
					})
					.catch((error) => {
						console.error("Error fetching data:", error);
						this.setState({ sections: [] });
					});
			}
		} else {
			axios
				.get(entryPointProjects)
				.then((response) => {
					return response.data;
				})
				.then((data) => {
					if (!Array.isArray(data)) {
						throw new TypeError("Expected an array but got " + typeof data);
					}

					let filteredAndMappedSections;
					if (this.state.apiSource === "zen") {
						filteredAndMappedSections = data.map((section) => ({
							label: section.acronym,
							value: section.acronym,
						}));
					} else if (this.state.apiSource === "isa") {
						filteredAndMappedSections = data
							.filter(
								(section) => section.code && section.code.startsWith("PROJETS_"),
							)
							.map((section) => ({
								label: section.name.fr,
								value: section.code,
							}));
					}

					this.setState({
						sections: filteredAndMappedSections,
					});

					// Update the block's attributes with the fetched data
					this.props.setAttributes({ section: filteredAndMappedSections });
				})
				.catch((error) => {
					console.error("Error fetching data:", error);
					this.setState({ sections: [] });
				});
		}
	}

	render() {

		const { attributes, setAttributes } = this.props;


		const optionsSectionsList = this.state.sections.map((section) => ({
			label: section.label,
			value: section.value,
		}));

		return (
			<InspectorControls>
				<PanelBody title={__("API Source")}>
					<SelectControl
						label={__("Select API Source")}
						value={this.state.apiSource}
						options={[
							{ label: "Select API", value: "" },
							{ label: "ISA", value: "isa" },
							{ label: "ZEN", value: "zen" },
						]}
						onChange={(apiSource) => {
							this.setState({ apiSource, zenFetchMode: "" });
							setAttributes({ apiSource });
							this.fetchData(apiSource);
						}}
					/>
				</PanelBody>
				{this.state.apiSource === "zen" && (
					<PanelBody title={__("ZEN Fetch Mode")}>
						<SelectControl
							label={__("Fetch By")}
							value={this.state.zenFetchMode}
							options={[
								{ label: "Select Mode", value: "" },
								{ label: "By Section", value: "section" },
								{ label: "By Professor SCIPER", value: "sciper" },
							]}
							onChange={(zenFetchMode) => {
								this.setState({ zenFetchMode });
								setAttributes({ zenFetchMode });
								this.fetchData(this.state.apiSource);
							}}
						/>
					</PanelBody>
				)}
				{this.state.apiSource === "zen" && this.state.zenFetchMode === "section" && (
					<PanelBody title={__("Section")}>
						<SelectControl
							value={attributes.section}
							onChange={(section) => {
								setAttributes({ section });
							}}
							options={[
								{ label: "Please choose", value: "" },
								...optionsSectionsList,
							]}
						/>
					</PanelBody>
				)}
				{this.state.apiSource === "zen" && this.state.zenFetchMode === "sciper" && (
					<PanelBody title={__("Filters", "epfl")}>
						<TextControl
							label={__("Professor(s) sciper(s)", "epfl")}
							help={__("Separated with commas", "epfl")}
							value={attributes.professorScipers}
							onChange={(professorScipers) => {
								console.log('Professor SCIPER input:', professorScipers); // Debugging log
								setAttributes({ professorScipers });
								setTimeout(() => {
									if (this.state.apiSource === "zen" && this.state.zenFetchMode === "sciper") {
										this.fetchData(this.state.apiSource);
									}
								}, 100); // Adding a slight delay to ensure state update
							}}
						/>
					</PanelBody>
				)}
				<PanelBody title={__("Filters", "epfl")}>
					<ToggleControl
						label={__("Only current projects", "epfl")}
						checked={attributes.onlyCurrentProjects}
						onChange={(onlyCurrentProjects) =>
							setAttributes({ onlyCurrentProjects })
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
